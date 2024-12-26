@echo off
setlocal enabledelayedexpansion

:: Vérifier si le fichier version.txt existe. S'il n'existe pas, créer avec 0.
if not exist version.txt (
    echo 0 > version.txt
)

:: Lire le numéro de version actuel depuis version.txt
set /p version=<version.txt

:: Incrémenter le numéro de version
set /a version+=1

:: Mettre à jour le fichier version.txt avec le nouveau numéro
echo !version! > version.txt

:: Exécuter les commandes Git
git add .
git commit -m "mise a jour - (!version!)"
if %ERRORLEVEL% neq 0 (
    echo Erreur lors du commit.
    pause
    exit /b 1
)

git push -u origin main
if %ERRORLEVEL% neq 0 (
    echo Erreur lors du push.
    pause
    exit /b 1
)

:: Si tout s'est bien passé
echo Mise a jour avec succes, version !version!
pause
