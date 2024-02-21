// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { create } from 'zustand'

// export type GlobalData = {
//   pageData: {
//     type: string
//     language: string
//   } & any
//   params: any
//   menuData: any[]
//   searchResult: any
//   update: (data: any) => void
//   setPageData: (data: any) => void
//   setParams: (data: any) => void
//   setMenuData: (data: any) => void
//   setSearchResult: (data: any) => void
// }

// // export const useGlobalData = create<GlobalData>((set) => ({
// //   pageData: {},
// //   params: {},
// //   menuData: [],
// //   searchResult: {},
// //   update: (data) => {
// //     if ('pageData' in data) {
// //       set({ pageData: data.pageData })
// //     }
// //     if ('params' in data) {
// //       set({ params: data.params })
// //     }
// //     if ('menuData' in data) {
// //       set({ menuData: data.menuData })
// //     }
// //     if ('searchResult' in data) {
// //       set({ searchResult: data.searchResult })
// //     }
// //   },
// //   setMenuData(data) {
// //     set({ menuData: data })
// //   },
// //   setSearchResult(data) {
// //     set({ searchResult: data })
// //   },
// //   setPageData(data) {
// //     set({ pageData: data })
// //   },
// //   setParams(data) {
// //     set({ params: data })
// //   },
// // }))
