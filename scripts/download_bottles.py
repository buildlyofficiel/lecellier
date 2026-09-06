import urllib.request
import urllib.parse
import json
import os
import subprocess

os.makedirs('public/images/bottles', exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"}

targets = {
    # Vins
    "vin-bordeaux-rouge": ("File:Château Chamanara Bordeaux Rouge Wine (France).jpg", "Bordeaux Rouge Château"),
    "vin-bordeaux-blanc": ("File:Chateau dYquem 1999.jpg", "Château d'Yquem Sauternes"),
    "vin-bourgogne-rouge": ("File:Burgundy bottles.jpg", "Bourgogne Pinot Noir bottle"),
    "vin-chablis": ("File:2010 Chablis La Larme D'or.jpg", "Chablis Premier Cru"),
    "vin-rhone-rouge": ("File:AOC châteauneuf-du-pape château des Fines Roches.jpg", "Châteauneuf-du-Pape"),
    "vin-rhone-blanc": ("File:Condrieu (AOC) 01.jpg", "Condrieu AOC bottle"),
    "vin-loire-rouge": ("File:2010 Clos de l'Echo Chinon from Couly-Dutheil (9281132553).jpg", "Chinon Couly-Dutheil"),
    "vin-loire-blanc": ("File:Pinot noir from Sancerre.jpg", "Sancerre Blanc bottle"),
    "vin-alsace-rouge": ("File:2008 Pinot Noir Vendanges Manuelles from Martin Zahn, Ribeauvillé, Alsace (6710993077).jpg", "Alsace Pinot Noir"),
    "vin-alsace-blanc": ("File:2007 Alsace Riesling Grand Cru Schoenenbourg Earl Regine Zimmer (13329793944).jpg", "Alsace Riesling Grand Cru"),
    "vin-languedoc": ("File:2008 Prieuré Saint-Hippolyte Languedoc (8601572480).jpg", "Languedoc Prieuré"),
    "vin-champagne": ("File:Champagne Louis Roederer Cristal 2002.jpg", "Champagne bottle Cristal Roederer"),

    # Spiritueux (Tous différents et réels !)
    "spirit-whisky": ("File:Armorik Whisky Single Malt de Bretagne France.jpg", "Armorik Single Malt Whisky"),
    "spirit-rhum": ("File:Rhum-agricole-clement-canne-bleue-millesime-2014.jpg", "Rhum Agricole Clément Canne Bleue"),
    "spirit-gin": ("File:Bottle, gin (51368810131).jpg", "Botanical craft gin bottle"),
    "spirit-cognac": ("File:2023 Hennessy V.S. Cognac.jpg", "Hennessy Cognac"),
    "spirit-armagnac": ("File:1910 Armagnac Grand cru.jpg", "Armagnac Grand Cru"),
    "spirit-calvados": ("File:Bottle of Boulard calvados.jpg", "Boulard Calvados Pays d'Auge"),
    "spirit-tequila": ("File:Guinness Tequila Bottles.jpg", "Tequila bottle Reposado"),
    "spirit-mezcal": ("File:Botella Rio Mezcal 2.jpg", "Mezcal Artesanal bottle"),
    "spirit-vodka": ("File:Fair Quinoa Vodka bottle.jpg", "Fair Vodka French craft"),
    "spirit-liqueur": ("File:16-09-17-WikiLovesCocktails-Flaschen-Img0136.jpg", "Chartreuse Verte Liqueur"),
}

def get_image_url(query):
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit=8&prop=imageinfo&iiprop=url|size|mime"
    req = urllib.request.Request(api_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, page in pages.items():
                title = page.get('title', '')
                ii = page.get('imageinfo', [{}])[0]
                u = ii.get('url')
                w, h = ii.get('width', 0), ii.get('height', 0)
                mime = ii.get('mime', '')
                if u and ('image/jpeg' in mime or 'image/png' in mime or 'image/webp' in mime) and h >= 400:
                    return title, u
    except Exception as e:
        print(f"Error search {query}: {e}")
    return None, None

for name, (pref_file, query) in targets.items():
    out_file = f"public/images/bottles/{name}.jpg"
    raw_file = f"/tmp/{name}_raw"
    title, url = get_image_url(pref_file)
    if not url:
        title, url = get_image_url(query)
    
    if url:
        print(f"[{name}] Downloading {title} from {url}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=12) as resp, open(raw_file, 'wb') as f:
                f.write(resp.read())
            
            # Use ImageMagick to resize nicely to 800x1000 with clean background and good quality
            cmd = f"convert '{raw_file}' -auto-orient -resize '800x1000^' -gravity center -extent 800x1000 -quality 90 '{out_file}'"
            subprocess.run(cmd, shell=True, check=True)
            print(f"-> Saved {out_file} ({os.path.getsize(out_file)} bytes)")
        except Exception as e:
            print(f"Failed processing {name}: {e}")
    else:
        print(f"[{name}] No URL found!")
