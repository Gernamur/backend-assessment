@echo off
for /R %1 %%f in (*.test.js) do node "%%f"