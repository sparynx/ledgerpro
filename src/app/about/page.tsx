import React from 'react';
import { Mail, Github, ExternalLink } from 'lucide-react';

const AboutPage = () => {
  // Configuration object for easy customization
  const aboutConfig = {
    project: {
      name: "LedgerPro",
      description: "A modern financial management platform designed for CDS groups and organizations. It helps you track contributions, manage expenses, and generate transparent reports with ease and security."
    },
    creator: {
      name: "Adebisi Timileyin S.",
      email: "adebisitimileyin23@gmail.com",
      github: "sparynx"
    },
    mission: "To empower CDS groups with simple, secure, and transparent financial tools, making group management stress-free and trustworthy for everyone.",
    contactPage: "/contact"
  };

  const ContactLink = ({ href, icon: Icon, children, external = false }) => (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-200 group"
    >
      <Icon className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
      <span className="font-medium">{children}</span>
      {external && <ExternalLink className="w-4 h-4 opacity-50" />}
    </a>
  );

  const Section = ({ title, children, className = "" }) => (
    <div className={`space-y-3 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-first container with proper spacing */}
      <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              About {aboutConfig.project.name}
            </h1>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Main content card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 sm:p-8 space-y-8">
              {/* Project Description */}
              <Section title="What is this project?">
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">{aboutConfig.project.name}</span>{' '}
                  {aboutConfig.project.description.replace(aboutConfig.project.name, '').trim()}
                </p>
              </Section>

              {/* Creator */}
              <Section title="Creator">
                <p className="text-lg font-medium text-gray-900">
                  {aboutConfig.creator.name}
                </p>
              </Section>

              {/* Mission */}
              <Section title="Our Mission">
                <p className="text-lg">
                  {aboutConfig.mission}
                </p>
              </Section>

              {/* Contact */}
              <Section title="Get in Touch">
                <div className="grid gap-4 sm:grid-cols-2">
                  <ContactLink 
                    href={`mailto:${aboutConfig.creator.email}`} 
                    icon={Mail}
                  >
                    Email Us
                  </ContactLink>
                  <ContactLink 
                    href={`https://github.com/${aboutConfig.creator.github}`} 
                    icon={Github}
                    external
                  >
                    View on GitHub
                  </ContactLink>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">2025 Executive Committee (EXCO)</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">State Code</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Position</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Phone</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-2">Anifowose Anjolaoluwa Mary</td>
                          <td className="px-4 py-2">FC/25A/11285</td>
                          <td className="px-4 py-2">President</td>
                          <td className="px-4 py-2 text-gray-400 italic">(number)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Adetunji Adeoluwa Samuel</td>
                          <td className="px-4 py-2">FC/25A/6288</td>
                          <td className="px-4 py-2">Vice President</td>
                          <td className="px-4 py-2 text-gray-400 italic">(number)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Ugo Oluodu Mary</td>
                          <td className="px-4 py-2">FC/25A/11684</td>
                          <td className="px-4 py-2">General Secretary</td>
                          <td className="px-4 py-2 text-gray-400 italic">(number)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Adebisi Timileyin Sodiq</td>
                          <td className="px-4 py-2">FC/25A/11981</td>
                          <td className="px-4 py-2">Financial Secretary</td>
                          <td className="px-4 py-2 text-gray-400 italic">(number)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Yakubu Kamaldeen</td>
                          <td className="px-4 py-2">FC/25A/12425</td>
                          <td className="px-4 py-2">Treasurer</td>
                          <td className="px-4 py-2 text-gray-400 italic">(number)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Nnamani Nwanne Patrice</td>
                          <td className="px-4 py-2">FC/25A/7374</td>
                          <td className="px-4 py-2">Welfare Secretary</td>
                          <td className="px-4 py-2 text-gray-400 italic">(number)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Yamah David Adiomokhai</td>
                          <td className="px-4 py-2">FC/25A/12407</td>
                          <td className="px-4 py-2">PRO</td>
                          <td className="px-4 py-2 text-gray-400 italic">(number)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Becky Peter Uba</td>
                          <td className="px-4 py-2">FC/25A/8876</td>
                          <td className="px-4 py-2">-</td>
                          <td className="px-4 py-2 text-gray-400 italic">(number)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Phone numbers will be added soon.</div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Need support?</span>{' '}
                    Visit our{' '}
                    <a 
                      href={aboutConfig.contactPage} 
                      className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
                    >
                      contact page
                    </a>{' '}
                    for detailed inquiries.
                  </p>
                </div>
              </Section>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Built with care for the community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;