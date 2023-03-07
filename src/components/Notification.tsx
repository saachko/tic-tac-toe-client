import React, { memo, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

interface NotificationProps {
  closeNotification: () => void;
  isShown: boolean;
}

function Notification({ closeNotification, isShown }: NotificationProps) {
  const [mountNotification, setMountNotification] = useState(false);
  const alertRef = useRef(null);
  useEffect(() => {
    if (isShown) {
      setMountNotification(true);
      setTimeout(() => setMountNotification(false), 2200);
      setTimeout(() => document.location.reload(), 2400);
    }
  }, [isShown]);

  useEffect(() => {
    if (!mountNotification) {
      setTimeout(() => {
        closeNotification();
      }, 200);
    }
  }, [mountNotification]);

  return (
    <CSSTransition
      nodeRef={alertRef}
      in={mountNotification}
      timeout={200}
      classNames="alert"
    >
      <div>
        {isShown && (
          <Alert
            ref={alertRef}
            variant="primary"
            onClose={() => setMountNotification(false)}
          >
            <p>
              Sorry, selected room already has both players, choose another room
              or try again later.
            </p>
          </Alert>
        )}
      </div>
    </CSSTransition>
  );
}

export default memo(Notification);
