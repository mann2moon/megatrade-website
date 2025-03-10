import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import History from './components/History'
import Alerts from '../account/components/Alerts'
import Password from '../account/components/Password'
import AccountDetails from './components/AccountDetails'
import AccountProfile from './components/AccountProfile'

import { UserApi } from 'config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Account = props => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [isLoading, setIsLoading] = useState(true)
	const [profileState, setProfileState] = useState({
		city: '',
		email: '',
		avatar: '',
		number: '',
		status: '',
		country: '',
		lastName: '',
		firstName: '',
		membership: '',
		membershipAmount: '',
		membershipHistory: [],
		notifications: {
			alerts: {
				email: false,
				dashboard: false,
				phoneCalls: false,
				textMessages: false
			},
			promotions: {
				email: false,
				dashboard: false,
				phoneCalls: false,
				textMessages: false
			},
			partnerPromotions: {
				email: false,
				dashboard: false,
				phoneCalls: false,
				textMessages: false
			}
		}
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await userApi.fetchAccount({ userId })

		if (fetchAccountResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })
		}

		setProfileState(profileState => ({
			...profileState,
			city: fetchAccountResult.data.city || '',
			email: fetchAccountResult.data.email || '',
			avatar: fetchAccountResult.data.avatar || '',
			number: fetchAccountResult.data.number || '',
			status: fetchAccountResult.data.status || '',
			country: fetchAccountResult.data.country || '',
			lastName: fetchAccountResult.data.lastName || '',
			firstName: fetchAccountResult.data.firstName || '',
			membership: fetchAccountResult.data.membership || '',
			membershipAmount: fetchAccountResult.data.membershipAmount || '',
			membershipHistory: fetchAccountResult.data.membershipHistory || [],
			notifications: {
				alerts: {
					email: fetchAccountResult.data.notifications.alerts.email || false,
					dashboard: fetchAccountResult.data.notifications.alerts.dashboard || false,
					phoneCalls: fetchAccountResult.data.notifications.alerts.phoneCalls || false,
					textMessages: fetchAccountResult.data.notifications.alerts.textMessages || false
				},
				promotions: {
					email: fetchAccountResult.data.notifications.promotions.email || false,
					dashboard: fetchAccountResult.data.notifications.promotions.dashboard || false,
					phoneCalls: fetchAccountResult.data.notifications.promotions.phoneCalls || false,
					textMessages: fetchAccountResult.data.notifications.promotions.textMessages || false
				},
				partnerPromotions: {
					email: fetchAccountResult.data.notifications.partnerPromotions.email || false,
					dashboard: fetchAccountResult.data.notifications.partnerPromotions.dashboard || false,
					phoneCalls: fetchAccountResult.data.notifications.partnerPromotions.phoneCalls || false,
					textMessages: fetchAccountResult.data.notifications.partnerPromotions.textMessages || false
				}
			}
		}))

		setIsLoading(false)
	}

	const reloadData = () => fetchProfileDetails()

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}>
				<Grid
					item
					xl={5}
					lg={12}
					md={12}
					xs={12}>
					<AccountProfile
						{...props}
						reloadData={reloadData}
						profile={{
							city: profileState.city,
							avatar: profileState.avatar,
							status: profileState.status,
							country: profileState.country,
							lastName: profileState.lastName,
							firstName: profileState.firstName
						}} />
				</Grid>

				<Grid
					item
					xl={7}
					lg={12}
					md={12}
					xs={12}>
					<Alerts
						reloadData={reloadData}
						notifications={profileState.notifications} />
				</Grid>

				<Grid
					item
					xl={7}
					lg={12}
					md={12}
					xs={12}>
					<AccountDetails
						reloadData={reloadData}
						profile={{
							city: profileState.city,
							email: profileState.email,
							number: profileState.number,
							country: profileState.country,
							lastName: profileState.lastName,
							firstName: profileState.firstName,
							membership: profileState.membership,
							membershipAmount: profileState.membershipAmount
						}} />
				</Grid>

				<Grid
					item
					xl={5}
					lg={12}
					md={12}
					xs={12}>
					<Password />
				</Grid>

				<Grid
					item
					lg={12}
					xl={12}
					md={12}
					xs={12}>
					<History
						reloadData={reloadData}
						subscriptions={profileState.membershipHistory} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Account