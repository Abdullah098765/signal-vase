import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton,  // Add TelegramShareButton
} from 'react-share';

import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
  TelegramIcon,  // Add TelegramIcon
} from 'react-share';

function ShareButton({ description, url }) {

  return (
    <>
      <div className="share-icon-collections flex flex-row justify-around mb-3">
        {/* Telegram */}
        <TelegramShareButton url={url} title={description}>
          <TelegramIcon size={40} round />
        </TelegramShareButton>
        {/* WhatsApp */}
        <WhatsappShareButton url={url} title={description}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        {/* Facebook */}
        <FacebookShareButton url={url} quote={description}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <EmailShareButton url={url} subject="You have to See this!" body={`Check out this site: ${url}\n${description}`}>
          <EmailIcon size={40} round />
        </EmailShareButton>
        {/* Twitter */}
        <TwitterShareButton url={url} title={description}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        {/* Pinterest */}
        <PinterestShareButton url={url} media="" description={description}>
          <PinterestIcon size={40} round />
        </PinterestShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>





        {/* Email */}

      </div>
    </>
  );
}

export default ShareButton;
