import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import Password from '../account/components/Password'
import AccountDetails from './components/AccountDetails'
import AccountProfile from './components/AccountProfile'

import { AdminApi } from 'config/Api'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Account = props => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(true)
	const [profileState, setProfileState] = useState({
		city: '',
		email: '',
		avatar: '',
		number: '',
		country: '',
		lastName: '',
		firstName: ''
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await adminApi.fetchAccount({ adminId })

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
			country: fetchAccountResult.data.country || '',
			lastName: fetchAccountResult.data.lastName || '',
			firstName: fetchAccountResult.data.firstName || ''
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
					xl={6}
					lg={12}
					md={12}
					xs={12}>
					<AccountProfile
						{...props}
						reloadData={reloadData}
						profile={{
							city: profileState.city,
							avatar: profileState.avatar,
							country: profileState.country,
							lastName: profileState.lastName,
							firstName: profileState.firstName
						}} />
				</Grid>

				<Grid
					item
					xl={6}
					lg={12}
					md={12}
					xs={12}>
					<Password reloadData={reloadData} />
				</Grid>

				<Grid
					item
					xl={12}
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
							firstName: profileState.firstName
						}} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Account