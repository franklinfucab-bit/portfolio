# FTC Griffinators photo gallery

Drop your FTC photos here. The portfolio's FTC card looks for these filenames:

```
photo-1.jpg
photo-2.jpg
photo-3.jpg
photo-4.jpg
photo-5.jpg
photo-6.jpg
```

Any slot whose file is missing renders a styled "Photo slot N" placeholder, so the layout never looks broken.

## How to add photos

1. Pick 1–6 of your favorite FTC photos.
2. Rename / save them as `photo-1.jpg` through `photo-6.jpg` in this folder.
3. (Optional) Compress large photos so the page loads quickly:

   ```bash
   python -c "from PIL import Image, ImageOps; img = Image.open('input.jpg'); \
   img = ImageOps.exif_transpose(img); img.thumbnail((1600, 1600), Image.LANCZOS); \
   img.convert('RGB').save('photo-1.jpg', 'JPEG', quality=82, optimize=True, progressive=True)"
   ```

4. Refresh the portfolio page — the photos appear automatically. Click any photo to open a full-size lightbox view.

## Captions

Captions are defined in `index.html` inside the `<figure class="gallery-item">` blocks. Default captions are:

| Slot | Caption |
| ---- | ------- |
| 1 | Competition day — 2022–2023 season |
| 2 | Robot build — mechanical assembly |
| 3 | The team |
| 4 | Custom claw mechanism |
| 5 | Awards — Best Design (MA) |
| 6 | Pit & practice |

Edit the `<figcaption>` text in `index.html` to match what's actually in each photo.

## Adding more / fewer slots

Edit `index.html` — duplicate or remove a `<figure class="gallery-item" data-slot="N">` block inside `<div class="gallery">`. Bump the `data-slot` numbers and the filenames will follow.
