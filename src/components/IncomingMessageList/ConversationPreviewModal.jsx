import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import MessageColumn from "./MessageColumn";
import SurveyColumn from "./SurveyColumn";

const styles = StyleSheet.create({
  container: {
    display: "flex"
  },
  column: {
    flex: 1,
    padding: "0 10px 0 10px"
  },
  conversationRow: {
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    fontWeight: "normal"
  }
});

const ConversationPreviewBody = props => {
  const { conversation, organizationId } = props,
    { contact, campaign } = conversation;
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.column)}>
        <MessageColumn
          conversation={conversation}
          organizationId={organizationId}
        />
      </div>
      <div className={css(styles.column)}>
        <SurveyColumn
          contact={contact}
          campaign={campaign}
          organizationId={organizationId}
        />
      </div>
    </div>
  );
};

ConversationPreviewBody.propTypes = {
  conversation: PropTypes.object.isRequired,
  organizationId: PropTypes.string.isRequired
};

const ConversationPreviewModal = props => {
  const { conversation, onRequestClose } = props,
    isOpen = conversation !== undefined;

  const primaryActions = [
    <FlatButton label="Close" primary={true} onClick={onRequestClose} />
  ];

  const customContentStyle = {
    width: "100%",
    maxWidth: "none"
  };

  return (
    <Dialog
      title={
        conversation
          ? `Conversation Review: ${conversation.campaign.title}`
          : "Conversation Review"
      }
      open={isOpen}
      actions={primaryActions}
      modal={false}
      contentStyle={customContentStyle}
      onRequestClose={onRequestClose}
    >
      {isOpen && (
        <ConversationPreviewBody
          key={conversation.contact.id}
          conversation={conversation}
          organizationId={props.organizationId}
        />
      )}
    </Dialog>
  );
};

ConversationPreviewModal.defaultProps = {
  onRequestClose: () => {}
};

ConversationPreviewModal.propTypes = {
  organizationId: PropTypes.string.isRequired,
  conversation: PropTypes.object,
  onRequestClose: PropTypes.func
};

export default ConversationPreviewModal;
