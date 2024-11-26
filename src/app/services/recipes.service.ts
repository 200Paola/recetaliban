import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cacheable, fromCache, CacheConfig, toCache } from '@angular/service-worker'; // Import caching utilities

// ... rest of your RecipesService imports and code

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) {}

  @Cacheable(
    cacheName: 'recipes', // Name of the cache from ngsw-config.json
    strategy: 'staleWhileRevalidate', // Caching strategy
    maxAge: 3 * 24 * 60 * 60 * 1000 // Max age of 3 days in milliseconds
  )
  searchRecipes(keyword: string): Observable<QueryResult> {
    const url = ${this.apiUrl}/recipes/complexSearch;
    const params = {
      query: keyword,
      number: 24,
      apiKey: this.apiKey,
    };

    return fromCache(this.http.get<QueryResult>(url, { params }))
      .pipe(
        // Handle the cached response if available
        mergeMap(cachedData => {
          if (cachedData) {
            return of(cachedData); // Return cached data if present
          }

          // If no cached data, fetch from network and update cache
          return this.http.get<QueryResult>(url, { params }).pipe(
            tap(data => toCache(this.http.get(url, { params })))
          );
        }),
        catchError(error => {
          // Handle network errors gracefully
          console.error('Failed to fetch recipes:', error);
          return throwError(error);
        })
      );
