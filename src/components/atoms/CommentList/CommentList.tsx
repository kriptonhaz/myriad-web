import React, {createRef, useEffect} from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import {CommentDetail} from '../CommentDetail';

import {FriendDetail} from 'src/components/FriendsMenu/hooks/use-friend-list.hook';
import {useQueryParams} from 'src/hooks/use-query-params.hooks';
import {Comment, CommentProps} from 'src/interfaces/comment';
import {SectionType} from 'src/interfaces/interaction';
import {User} from 'src/interfaces/user';

type CommentListProps = {
  section: SectionType;
  user?: User;
  comments: Comment[];
  mentionables: FriendDetail[];
  deep?: number;
  placeholder?: string;
  focus?: boolean;
  expand?: boolean;
  onComment: (comment: Partial<CommentProps>) => void;
  onUpvote: (comment: Comment) => void;
  onRemoveVote: (comment: Comment) => void;
  onLoadReplies: (referenceId: string, deep: number) => void;
  onOpenTipHistory: (comment: Comment) => void;
  onSendTip: (comment: Comment) => void;
  onReport: (comment: Comment) => void;
  onSearchPeople: (query: string) => void;
  setDownvoting: (comment: Comment) => void;
  onBeforeDownvote?: () => void;
};

type refComment = Record<any, React.RefObject<HTMLDivElement>>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

export const CommentList: React.FC<CommentListProps> = props => {
  const {
    section,
    user,
    comments = [],
    mentionables,
    deep = 0,
    onComment,
    onUpvote,
    onRemoveVote,
    onLoadReplies,
    onOpenTipHistory,
    onReport,
    onSendTip,
    onSearchPeople,
    setDownvoting,
    onBeforeDownvote,
  } = props;
  const {query} = useQueryParams();

  const styles = useStyles();

  let refs: any = comments.reduce((acc: refComment, value: any) => {
    acc[value.id] = createRef<HTMLDivElement>();
    return acc;
  }, {});

  useEffect(() => {
    if (Object.keys(refs).length > 0) {
      if (!Array.isArray(query.comment) && query.comment) {
        if (refs[query.comment]?.current) {
          refs[query.comment].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }

    () => {
      refs = {};
    };
  }, [refs]);

  return (
    <div className={styles.root}>
      {comments.map(comment => (
        <CommentDetail
          ref={refs[comment.id]}
          section={section}
          user={user}
          key={comment.id}
          comment={comment}
          mentionables={mentionables}
          deep={deep}
          onReply={onComment}
          onUpvote={onUpvote}
          onRemoveVote={onRemoveVote}
          onLoadReplies={onLoadReplies}
          onOpenTipHistory={onOpenTipHistory}
          onReport={onReport}
          onSendTip={onSendTip}
          onSearchPeople={onSearchPeople}
          setDownvoting={setDownvoting}
          onBeforeDownvote={onBeforeDownvote}
        />
      ))}
    </div>
  );
};
