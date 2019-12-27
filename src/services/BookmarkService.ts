// @TODO This needs to be hooked up to some external service,
// @TODO could be firebase or the schedule proxy for easy access to push
let bookmarks: any[] = [];

export async function GetBookmarks() {
  return bookmarks;
}

export async function SetBookmark(bookmark: any) {
  bookmarks = [...bookmarks, bookmark];

  console.log(bookmarks);
}

export async function RemoveBookmark(bookmark: any) {
  bookmarks.filter((bm) => {
    return bm.id !== bookmark.id;
  });
}
