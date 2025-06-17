# Liste des scripts disponibles
$scripts = @(
    "data_dump.js",
    "bdd_dev.js"
)

# Nombre max d'indices
$count = $scripts.Length - 1

# On récupère l'argument ou on demande l'indice à l'utilisateur s'il n'en a pas précisé un
if ($args.Count -eq 0) 
{
    Write-Host "Choisissez un script à exécuter :"
    for ($i = 0; $i -le $count; $i++) 
    {
        Write-Host "[$i] $($scripts[$i])"
    }
    $index = Read-Host "Entrez l'indice du script à exécuter"
} 
else 
{
    $index = $args[0]
}

# Validation de l'indice
if ([int]::TryParse($index, [ref]$null) -and $index -ge 0 -and $index -le $count) 
{
    $script = $scripts[$index]
} 
else 
{
    Write-Host "Indice invalide. Script interrompu."
    exit 1
}

Write-Host ""
Write-Host "Injection des données dans MongoDB via Docker avec le script : $script"
Write-Host ""

# On lance la commande Docker
docker exec -it mongodb mongosh "/Database/$script"

Write-Host ""
Read-Host -Prompt "Appuyez sur Entrée pour fermer"