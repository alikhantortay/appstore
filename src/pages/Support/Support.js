import { Helmet } from "react-helmet-async";

import { ContactUs } from "../../components/SupportPage/ContactUs/ContactUs";
import { Help } from "../../components/SupportPage/Help/Help";
import { HelpTopics } from "../../components/SupportPage/HelpTopics/HelpTopics";

const Support = () => {
  return (
    <>
      <Helmet>
        <title>Служба поддержки</title>
      </Helmet>
      <Help />
      <HelpTopics />
      <ContactUs />
    </>
  );
};

export default Support;
