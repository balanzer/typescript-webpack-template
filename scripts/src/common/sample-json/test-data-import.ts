import homeSample from "./home/home-tracking-json-1.json";
import searchSample from "./search/search-tracking-json-1.json";

export class DataSamples {
  public static getHomePage(): any {
    return homeSample;
  }

  public static getSearchPage(): any {
    return searchSample;
  }
}
