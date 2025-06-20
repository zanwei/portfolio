import Link from 'next/link';

const socialLinks = [
  { 
    name: 'X', 
    href: 'https://x.com/home', 
    icon: '/icons/Twitter.svg'
  },
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/', 
    icon: '/icons/Instagram.svg'
  },
  { 
    name: 'Dribbble', 
    href: 'https://dribbble.com/zanwei', 
    icon: '/icons/dribbble.svg'
  },
  { 
    name: 'Email', 
    href: 'mailto:zanwei.guo@outlook.com', 
    icon: '/icons/email.svg'
  },
];

const SocialIcon = ({ href, children, name }: { href: string, children: React.ReactNode, name: string }) => {
  const isMail = name === 'Email';
  const commonProps = {
    className: "p-2 rounded-full hover:bg-gray-200 transition-colors block",
    'aria-label': `Link to ${name}`,
  };

  if (isMail) {
    return <a href={href} {...commonProps}>{children}</a>;
  }

  return <Link href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>{children}</Link>;
};

const SocialLinks = () => (
  <div className="flex items-center space-x-1">
    {socialLinks.map(link => (
      <SocialIcon key={link.name} href={link.href} name={link.name}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={link.icon} 
          alt={`${link.name} icon`} 
          width={24} 
          height={24}
          className="w-6 h-6"
        />
      </SocialIcon>
    ))}
  </div>
);

export default SocialLinks; 