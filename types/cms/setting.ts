type PageNaviProps = {
  PREV_TXT: string;
  NEXT_TXT: string;
	ITEMS: number;
  NEW_LIST_LIMIT: number;
}

export const PAGE_NAVI:PageNaviProps = { 
  PREV_TXT : "<",
  NEXT_TXT : ">",
	ITEMS: 2,
  NEW_LIST_LIMIT: 9
}