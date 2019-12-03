/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Budget from './components/Budget'
import TradePie from './components/TradePie'
import TotalPips from './components/TotalPips'
import TotalUsers from './components/TotalUsers'
import LatestAlerts from './components/LatestAlerts'
import SignalAlerts from './components/SignalAlerts'
import TotalProfits from './components/TotalProfits'

import { UserApi } from '../../../config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Dashboard = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	useEffect(() => { fetchStatistics() }, [])

	const fetchStatistics = async () => {
		const fetchStatisticsResult = await userApi.fetchStatistics({ userId })
		if (fetchStatisticsResult.error)
			return enqueueSnackbar(fetchStatisticsResult.message, { variant: 'error' })

		console.log(fetchStatisticsResult);

	}

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}>
				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<Budget />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalUsers />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalPips />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalProfits />
				</Grid>

				<Grid
					item
					lg={8}
					xl={9}
					md={12}
					xs={12}>
					<LatestAlerts />
				</Grid>

				<Grid
					item
					lg={4}
					md={6}
					xl={3}
					xs={12}>
					<TradePie />
				</Grid>

				<Grid
					item
					lg={8}
					xl={12}
					md={12}
					xs={12}>
					<SignalAlerts />
				</Grid>
			</Grid>
		</div>
	)
}

export default Dashboard