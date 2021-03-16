import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import RedditIcon from '@material-ui/icons/Reddit';
import StyledBadge from '../common/Badge.component';
import { PostOrigin } from '../../interfaces/post';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontSize: 14
    },
    avatar: {
      backgroundColor: '#E849BD'
    },
    facebook: {
      '& .MuiBadge-badge': {
        backgroundColor: '#3b5998'
      }
    },
    twitter: {
      '& .MuiBadge-badge': {
        backgroundColor: '#1DA1F2'
      }
    },
    reddit: {
      '& .MuiBadge-badge': {
        backgroundColor: '#FF5700'
      }
    }
  })
);

type Props = {
  origin: PostOrigin;
  avatar: string;
};

export default function PostComponent({ origin, avatar }: Props) {
  const classes = useStyles();

  const socials = React.useMemo(
    () => ({
      facebook: <FacebookIcon />,
      twitter: <TwitterIcon />,
      reddit: <RedditIcon />
    }),
    []
  );

  return (
    <IconButton aria-label="avatar-icon">
      <StyledBadge badgeContent={socials[origin]} className={classes[origin]} color="default">
        <Avatar className={classes.avatar} aria-label="avatar">
          {avatar}
        </Avatar>
      </StyledBadge>
    </IconButton>
  );
}
