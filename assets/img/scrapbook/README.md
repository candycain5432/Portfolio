# Scrapbook photos

Photos for the **Scrapbook** section of the site go in this folder.

1. Upload them here. On GitHub: open this folder, then **Add file → Upload files**.
2. In `js/data.js`, find `scrapbook` and put the file's path in an empty spot's `src`
   (add a caption too if you like):

   ```js
   { src: "assets/img/scrapbook/trail-ride.jpg", caption: "first ride of the year", shape: "tall" },
   ```

   The number on each empty spot on the site (#02, #03 …) is its position in that list.
3. `shape` is `"tall"` (3:4), `"wide"` (4:3) or `"square"`. Photos are cropped to fit,
   so pick the shape closest to the photo.

Spots without a `src` show up as empty "photo goes here" frames. Delete the ones you
don't need, or copy a line to add more spots.

**Tips**

- Use JPG, PNG or WebP. iPhone HEIC photos only show up in Safari, so export them as JPG.
- Phone photos are big and slow the page down. About 1600px on the long side is plenty.
- File names with no spaces are easiest (`beach-day.jpg`, not `Beach Day.jpg`).
