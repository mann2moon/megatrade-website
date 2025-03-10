import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 50,
        borderRadius: 25,
        backgroundColor: theme.palette.background.default
    },
    media: {
        height: 80,
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        '& > img': {
            width: 'auto',
            height: '100%'
        }
    },
    content: {
        padding: theme.spacing(1, 2)
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(1, 2)
    }
}))

const UpgradePlan = props => {
    const { className, ...rest } = props

    const classes = useStyles()

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}>
            <div className={classes.media}>
                <img
                    alt='upgrade'
                    src='/images/sidebar-upgrade.svg' />
            </div>

            <div className={classes.content}>
                <Typography
                    variant='h6'
                    gutterBottom
                    align='center'>
                    We are Sorry! Live is coming soon to Premium Members
        		</Typography>

                <Typography
                    align='center'
                    variant='body2'>
                    Upgrade your Subscription to recieve all features including trading signals, group chat, etc.
        		</Typography>
            </div>

            <div className={classes.actions}>
                <Button
                    color='primary'
                    component={Link}
                    to='/subscriptions'
                    variant='contained'>
                    Upgrade Now
        		</Button>
            </div>
        </div>
    )
}

UpgradePlan.propTypes = {
    className: PropTypes.string
}

export default UpgradePlan