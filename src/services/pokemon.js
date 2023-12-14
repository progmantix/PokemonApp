import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonsPaginator: builder.query({
      query: (pageNumber) => {
        const offset = (pageNumber - 1) * 20;
        return `pokemon/?offset=${offset}&limit=20`;
      },
    }),
    getPokemonsById: builder.query({
      query: (id) => {
        return `pokemon/${id}/`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useGetPokemonsByIdQuery,
  useGetPokemonsPaginatorQuery,
  usePrefetch,
} = pokemonApi;
