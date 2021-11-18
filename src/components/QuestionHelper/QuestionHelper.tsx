import React from 'react';
import { Box } from '@material-ui/core';
import { HelpCircle as Question, PlusCircle } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import { CustomTooltip } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  questionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.2,
    border: 'none',
    background: 'none',
    outline: 'none',
    cursor: 'default',
    borderRadius: 36,
    color: palette.text.primary,
    '&:hover, &:focus': {
      opacity: 0.7,
    },
  },
  lightQuestionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0.2,
    border: 'none',
    background: 'none',
    outline: 'none',
    cursor: 'default',
    borderRadius: 36,
    width: 24,
    height: 24,
    color: 'white',
    '&:hover, &:focus': {
      opacity: 0.7,
    },
  },
  questionMark: {
    fontSize: '1rem',
  },
}));

const QuestionHelper: React.FC<{ text: string; size?: number }> = ({
  text,
  size = 16,
}) => {
  const classes = useStyles();

  return (
    <CustomTooltip title={text}>
      <Box className={classes.questionWrapper}>
        <Question size={size} />
      </Box>
    </CustomTooltip>
  );
};

export default QuestionHelper;

export const PlusHelper: React.FC<{ text: string }> = ({ text }) => {
  const classes = useStyles();

  return (
    <CustomTooltip title={text}>
      <Box className={classes.questionWrapper}>
        <PlusCircle style={{ cursor: 'pointer' }} size={16} />
      </Box>
    </CustomTooltip>
  );
};

export const LightQuestionHelper: React.FC<{ text: string }> = ({ text }) => {
  const classes = useStyles();

  return (
    <CustomTooltip title={text}>
      <Box className={classes.lightQuestionWrapper}>
        <span className={classes.questionMark}>?</span>
      </Box>
    </CustomTooltip>
  );
};
