/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import {
	Card,
	Grid,
	Button,
	Divider,
	Checkbox,
	CardHeader,
	Typography,
	CardContent,
	CardActions,
	FormControlLabel
} from '@material-ui/core'

import { UserApi } from '../../../../config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(() => ({
	root: {},
	item: {
		display: 'flex',
		flexDirection: 'column'
	}
}))

const Alerts = props => {
	const { className, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [profileState, setProfileState] = useState({
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
			}
		},
		isChanged: false
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await userApi.fetchAccount({ userId })

		if (fetchAccountResult.error)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })

		setProfileState(profileState => ({
			...profileState,
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
				}
			}
		}))
	}

	const onChangeAlerts = event => {
		event.persist()

		setProfileState(profileState => ({
			...profileState,
			notifications: {
				...profileState.notifications,
				alerts: {
					...profileState.notifications.alerts,
					[event.target.name]: event.target.checked
				}
			},
			isChanged: true
		}))
	}

	const onChangePromotions = event => {
		event.persist()

		setProfileState(profileState => ({
			...profileState,
			notifications: {
				...profileState.notifications,
				promotions: {
					...profileState.notifications.promotions,
					[event.target.name]: event.target.checked
				}
			},
			isChanged: true
		}))
	}

	const onSaveDetails = async () => {
		const saveResult = await userApi.updateAccount({
			userId,
			notifications: profileState.notifications
		})

		if (saveResult.error)
			return enqueueSnackbar(saveResult.message, { variant: 'error' })

		enqueueSnackbar(saveResult.message, { variant: 'success' })
		window.location.reload()
	}

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<form>
				<CardHeader
					title='Notifications'
					subheader='Manage how you want to recieve your notifications' />

				<Divider />

				<CardContent>
					<Grid
						container
						wrap='wrap'
						spacing={6}>
						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							className={classes.item}>
							<Typography
								variant='h6'
								gutterBottom>
								Alerts
              				</Typography>

							<FormControlLabel
								name='dashboard'
								label='Dashboard'
								control={
									<Checkbox
										color='primary'
										onChange={onChangeAlerts}
										checked={profileState.notifications.alerts.dashboard} />
								} />

							<FormControlLabel
								name='email'
								label='Email'
								control={
									<Checkbox
										color='primary'
										onChange={onChangeAlerts}
										checked={profileState.notifications.alerts.email} />
								} />

							<FormControlLabel
								name='textMessages'
								label='Text Messages'
								control={
									<Checkbox
										color='primary'
										onChange={onChangeAlerts}
										checked={profileState.notifications.alerts.textMessages} />
								} />

							<FormControlLabel
								name='phoneCalls'
								label='Phone Calls'
								control={
									<Checkbox
										color='primary'
										onChange={onChangeAlerts}
										checked={profileState.notifications.alerts.phoneCalls} />
								} />
						</Grid>

						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							className={classes.item}>
							<Typography
								variant='h6'
								gutterBottom>
								Promotions
              				</Typography>

							<FormControlLabel
								name='dashboard'
								label='Dashboard'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePromotions}
										checked={profileState.notifications.promotions.dashboard} />
								} />

							<FormControlLabel
								name='email'
								label='Email'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePromotions}
										checked={profileState.notifications.promotions.email} />
								} />

							<FormControlLabel
								name='textMessages'
								label='Text Messages'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePromotions}
										checked={profileState.notifications.promotions.textMessages} />
								} />

							<FormControlLabel
								name='phoneCalls'
								label='Phone Calls'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePromotions}
										checked={profileState.notifications.promotions.phoneCalls} />
								} />
						</Grid>
					</Grid>
				</CardContent>

				<Divider />

				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={onSaveDetails}
						disabled={!profileState.isChanged}>
						Save Details
          			</Button>
				</CardActions>
			</form>
		</Card>
	)
}

Alerts.propTypes = {
	className: PropTypes.string
}

export default Alerts