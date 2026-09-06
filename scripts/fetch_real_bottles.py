import urllib.request
import urllib.parse
import json
import os
import time
import subprocess

os.makedirs("public/images/bottles", exist_ok=True)

headers = {"User-Agent": "LeCellierCaves/1.0 (https://lecellier.fr; caviste@lecellier.fr)"}

mapping = {
    # Vins
    "vin-bordeaux-rouge": ("File:Château Chamanara.jpg", "Château Chamanara — Bordeaux Supérieur Rouge"),
    "vin-bordeaux-blanc": ("File:Château d'Yquem.jpg", "Château d’Yquem — Grand Cru Supérieur"),
    "vin-bourgogne-rouge": ("File:Burgundy bottles.jpg", "Domaine Bourguignon — Pinot Noir Réserve"),
    "vin-chablis": ("File:2010 Chablis La Larme D'or.jpg", "Domaine Larme d’Or — Chablis Premier Cru"),
    "vin-rhone-rouge": ("File:AOC châteauneuf-du-pape château des Fines Roches.jpg", "Château des Fines Roches — Châteauneuf-du-Pape"),
    "vin-rhone-blanc": ("File:Le Jars Blanc Viognier.jpg", "Domaine Le Jars — Viognier Blanc des Côtes du Rhône"),
    "vin-loire-rouge": ("File:2010 Clos de l'Echo Chinon from Couly-Dutheil (9281132553).jpg", "Couly-Dutheil — Chinon Clos de l’Écho"),
    "vin-loire-blanc": ("File:Pinot noir from Sancerre.jpg", "Domaine de Sancerre — Sauvignon Blanc d’Exception"),
    "vin-alsace-rouge": ("File:2008 Pinot Noir Vendanges Manuelles from Martin Zahn, Ribeauvillé, Alsace (6710993077).jpg", "Martin Zahn — Pinot Noir d’Alsace Ribeauvillé"),
    "vin-alsace-blanc": ("File:2007 Alsace Riesling Grand Cru Schoenenbourg Earl Regine Zimmer (13329793944).jpg", "Régine Zimmer — Alsace Riesling Grand Cru Schoenenbourg"),
    "vin-languedoc": ("File:2008 Prieuré Saint-Hippolyte Languedoc (8601572480).jpg", "Prieuré Saint-Hippolyte — Languedoc Terroir d’Exception"),
    "vin-champagne": ("File:Big Champagne bottle of Cramant.jpg", "Maison Grand Cru — Champagne Blanc de Blancs Cramant"),

    # Spiritueux (10 bouteilles réelles et différentes !)
    "spirit-whisky": ("File:Armorik Whisky Single Malt de Bretagne France.jpg", "Armorik — Whisky Single Malt Français de Bretagne"),
    "spirit-rhum": ("File:Rhum-agricole-clement-canne-bleue-millesime-2014.jpg", "Maison Clément — Rhum Agricole Canne Bleue Martinique"),
    "spirit-gin": ("File:Bottle, gin (51368810131).jpg", "Distillerie Botanique — Gin Artisanal aux Baies de Genièvre"),
    "spirit-cognac": ("File:2023 Hennessy V.S. Cognac.jpg", "Maison Hennessy — Cognac Very Special V.S"),
    "spirit-armagnac": ("File:1910 Armagnac Grand cru.jpg", "Domaine Grand Cru — Armagnac Millésimé"),
    "spirit-calvados": ("File:Bottle of Boulard calvados.jpg", "Maison Boulard — Calvados Pays d’Auge"),
    "spirit-tequila": ("File:Guinness Tequila Bottles.jpg", "Tequila Reposado — 100% Pur Agave Bleu"),
    "spirit-mezcal": ("File:Botella Rio Mezcal 2.jpg", "Rio Mezcal Artesanal — Tradition d’Oaxaca"),
    "spirit-vodka": ("File:Crystal Head Vodka.jpg", "Crystal Head — Vodka Pure Filtrée"),
    "spirit-liqueur": ("File:16-09-17-WikiLovesCocktails-Flaschen-Img0136.jpg", "Chartreuse Verte — Liqueur des Pères Chartreux"),
}

# 1. Obtenir toutes les URLs des vignettes en une seule requête API
titles_list = [v[0] for v in mapping.values()]
pipe_titles = "|".join(titles_list)
api_url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=" + urllib.parse.quote(pipe_titles) + "&prop=imageinfo&iiprop=url&iiurlwidth=800"

print("Fetching thumbnail URLs from Wikimedia Commons API...")
req = urllib.request.Request(api_url, headers=headers)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode("utf-8"))

title_to_url = {}
for pid, p in data.get("query", {}).get("pages", {}).items():
    t = p.get("title")
    ii = p.get("imageinfo", [{}])[0]
    thumb = ii.get("thumburl") or ii.get("url")
    if thumb:
        title_to_url[t] = thumb

print(f"Obtained {len(title_to_url)} thumbnail URLs.")

# 2. Télécharger et convertir chaque image avec ImageMagick
for slug, (wiki_title, label) in mapping.items():
    img_url = title_to_url.get(wiki_title)
    if not img_url:
        print(f"Skipping {slug}: No URL found for {wiki_title}")
        continue
    
    out_file = f"public/images/bottles/{slug}.jpg"
    raw_file = f"/tmp/{slug}_raw.jpg"
    
    print(f"Downloading {slug} ({label})...")
    try:
        dl_req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(dl_req, timeout=15) as r, open(raw_file, "wb") as f:
            f.write(r.read())
        
        # ImageMagick : redimensionner et cadrer proprement en 800x1000
        cmd = f"convert '{raw_file}' -auto-orient -resize '800x1000^' -gravity center -extent 800x1000 -quality 88 '{out_file}'"
        subprocess.run(cmd, shell=True, check=True)
        size_kb = os.path.getsize(out_file) // 1024
        print(f"✓ Saved {out_file} ({size_kb} KB)")
        time.sleep(0.5) # respect rate limit
    except Exception as e:
        print(f"✗ Failed {slug}: {e}")

print("Done downloading all real bottles!")
