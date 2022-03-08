/*
	Error: Optional route parameters are not yet supported ("[[last_index]]")
	So this emulate route localhost/recent/ in case there are no localhost/recent/[last_index]
*/

import { default as index, getServerSideProps as getprops } from "./recent/[last_index]"

export const getServerSideProps = getprops

export default index
