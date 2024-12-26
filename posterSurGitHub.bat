@echo off
set /p version="Entrez le numéro de version: "
git add .
git commit -m "mise a jour - (%version%)"
git push -u origin main
pause
