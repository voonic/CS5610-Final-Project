/**
 * A class that represents teh watchlist of users.
 * Represents individual watchlist item.
 */
export default class Watchlist {
  constructor(id, addedBy, movieId, addTime, movie) {
    this.id = id;
    this.addedBy = addedBy;
    this.movieId = movieId;
    this.addTime = addTime;
    this.movie = movie;
  }

  /**
   * Responsible for returning a list of watchlist from the array of watchlist passed.
   */
  static getListFromJsonArray(results) {
    let vals = [];
    results.forEach((res) => {
      const watchlist = new Watchlist(
        res._id,
        res.addedBy,
        res.movieId,
        res.addTime,
        res.movie
      );
      vals.push(watchlist);
    });
    return vals;
  }
}
