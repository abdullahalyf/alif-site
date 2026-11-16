# Task files

Claude (orchestrator) writes one file per big job here. Alif starts an agent with one line:

    Read and run docs/tasks/<FILE>.md

Each file has: agent + settings, a fixed run order (sync → read → plan → execute parts → verify → PR), the parts, and a report format. The agent writes its report to `docs/reports/<AGENT>-<NN>-report.md` on its branch (and as the PR body); Claude reads it from GitHub. Alif only says "done".

Naming: `<AGENT>-<NN>-<short-name>.md` (AGENT = CODEX or POOKOO).
