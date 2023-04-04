import React from "react";

interface FooterProps {
  orgName: string;
  settingsUrl: string;
}

const Footer: React.FC<FooterProps> = ({ orgName, settingsUrl }) => {
  return (
    <small>
      You are receiving this email because you signed up to text for {orgName}.{" "}
      You can update your notification preferences{" "}
      <a href={settingsUrl}>here</a> or{" "}
      <a href={settingsUrl}>unsubscribe from all notifications</a>.
      <br /> - Politics Rewired Team
    </small>
  );
};
export default Footer;
