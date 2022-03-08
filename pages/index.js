/*
	This emulate redirecting / to recent/
*/

import { default as index, getServerSideProps as getprops } from "./recent/[last_index]"

export const getServerSideProps = getprops

export default index
