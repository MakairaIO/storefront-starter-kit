export type MenuItem = {
  text: {
    en?: string
    de?: string
  }
  link: {
    en?: string
    de?: string
  }
  uuid: string
  children?: MenuItem[]
  expanded?: boolean
}
