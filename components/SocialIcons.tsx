import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";
import { profile } from "@/lib/data";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedinIcon />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GithubIcon />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <MailIcon />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
