let baseUrl;
// #ifdef H5
baseUrl = "/remote"
// #endif
// #ifdef APP-PLUS ||MP
baseUrl = "http://www.safereborn.com:8091/"
// #endif

const URL = {
	GetIdentifyCode: `${baseUrl}/auth/facadeauth/getIdentifyCode`,
	RegisterByPhone: `${baseUrl}/auth/facadeauth/registerByPhone`,
	LoginByShortMsg: `${baseUrl}/auth/facadeauth/loginByShortMsg`,
	CheckAndSendShortMsg: `${baseUrl}/auth/facadeauth/checkAndSendShortMsg`,
	GetCurrUserInfo: `${baseUrl}/auth/facadeauth/getCurrUserInfo`,
  LoginByPwd: `${baseUrl}/auth/facadeauth/login`,
  SendRegisterEmail: `${baseUrl}auth/facadeauth/sendRegisterEmail`,
  GetIdentifyCodeForEMail: `${baseUrl}/auth/facadeauth/getIdentifyCodeForEMail`,
	ResetUserPwdByPhone: `${baseUrl}/auth/facadeauth/resetUserPwdByPhone`
}

export const resetUserPwdByPhone = (objParam = {
	mobilePhoneNo: undefined,
	userPwd: undefined,
	identifyCode: undefined
}) => {
	return uni.$post(URL.ResetUserPwdByPhone, objParam)
}

export const getIdentifyCodeForEMail = (objParam = { userEMail: undefined }) => {
	return uni.$post(URL.GetIdentifyCodeForEMail, objParam)
}

export const sendRegisterEmail = (objParam = {
	userEMail: undefined,
	userPwd: undefined,
	confirmPwd: undefined
}) => {
	return uni.$post(URL.SendRegisterEmail, objParam)
}

export const loginByPwd = (objParam = {
	userNo: undefined,
	userPwd: undefined
}) => {
	return uni.$post(URL.LoginByPwd, objParam)
}

export const getCurrUserInfo = () => {
	return uni.$post(URL.GetCurrUserInfo)
}

export const registerByPhone = (objParam = {
	mobilePhoneNo: undefined,
	identifyCode: undefined,
	userPwd: undefined
}) => {
	return uni.$post(URL.RegisterByPhone, objParam)
}

export const loginByShortMsg = (objParam = {
	mobilePhoneNo: undefined,
	identifyCode: undefined
}) => {
	return uni.$post(URL.LoginByShortMsg, objParam)
}

export const getIdentifyCode = (objParam = {
	mobilePhoneNo: undefined
}) => {
	return uni.$post(URL.GetIdentifyCode, objParam)
}

export const checkAndSendShortMsg = (objParam = {
	mobilePhoneNo: undefined,
	identifyCode: undefined
}) => {
	return uni.$post(URL.CheckAndSendShortMsg, objParam)
}
