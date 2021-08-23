export function isEnabled(feature: string) {
	const disabledFlag = `FEATURE_FLAG_DISABLE_${feature}`;
	const isDisabled = Boolean(process.env[disabledFlag]);
	return !isDisabled;
}
