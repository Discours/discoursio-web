//import Cookies from 'js-cookie'

export const isLoggedIn = (): boolean => {
	//') as string) !== undefined || false;
	// or return fake true for testing purposes
	return true
}

export const routeProtect = (
	base: Record<string, unknown> = {}
): Record<string, unknown> => {
	if (!isLoggedIn()) {
		return {
			redirect: '/app/auth',
			status: 303,
		}
	}
	return base
}
