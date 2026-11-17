"""Check the public MVP and track availability incidents as GitHub issues."""

from datetime import datetime, timezone
import json
import os
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


ISSUE_TITLE = "[Monitoramento] Site indisponível"
API_ROOT = "https://api.github.com/repos/"


def github_request(method, path, token, payload=None):
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    request = Request(
        API_ROOT + path,
        data=data,
        method=method,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
            "User-Agent": "adocao-animal-boituva-uptime-monitor",
        },
    )
    with urlopen(request, timeout=15) as response:
        content = response.read()
        return json.loads(content) if content else None


def check_site(url):
    request = Request(url, headers={"User-Agent": "adocao-animal-boituva-uptime-monitor"})
    with urlopen(request, timeout=20) as response:
        if not 200 <= response.status < 400:
            raise RuntimeError(f"HTTP {response.status}")
        return response.status


def main():
    url = os.environ["SITE_URL"]
    repository = os.environ["GITHUB_REPOSITORY"]
    token = os.environ["GITHUB_TOKEN"]
    repo_path = quote(repository, safe="/")
    open_issues = github_request(
        "GET", f"{repo_path}/issues?state=open&per_page=100", token
    )
    incident = next(
        (
            item
            for item in open_issues
            if item.get("title") == ISSUE_TITLE and "pull_request" not in item
        ),
        None,
    )

    try:
        status = check_site(url)
    except (HTTPError, URLError, TimeoutError, RuntimeError) as error:
        timestamp = datetime.now(timezone.utc).isoformat()
        details = f"Falha observada em {timestamp}: {error}"
        if incident is None:
            issue = github_request(
                "POST",
                f"{repo_path}/issues",
                token,
                {"title": ISSUE_TITLE, "body": f"A verificação automática não recebeu resposta HTTP de sucesso de {url}.\n\n{details}"},
            )
            print(f"Incidente registrado: {issue['html_url']}")
        else:
            print(f"Incidente continua aberto: {incident['html_url']}")
        print(details, file=sys.stderr)
        return 1

    print(f"UP: {url} respondeu HTTP {status}.")
    if incident is not None:
        github_request(
            "POST",
            f"{repo_path}/issues/{incident['number']}/comments",
            token,
            {"body": f"O monitoramento confirmou a recuperação do site em {datetime.now(timezone.utc).isoformat()}. Resposta HTTP {status} em {url}."},
        )
        github_request(
            "PATCH",
            f"{repo_path}/issues/{incident['number']}",
            token,
            {"state": "closed"},
        )
        print(f"Incidente #{incident['number']} encerrado após recuperação.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
