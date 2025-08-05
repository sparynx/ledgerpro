import React from 'react';

const exco = [
  { name: 'Anifowose Anjolaoluwa Mary', stateCode: 'FC/25A/11285', position: 'President', phone: '' },
  { name: 'Adetunji Adeoluwa Samuel', stateCode: 'FC/25A/6288', position: 'Vice President', phone: '' },
  { name: 'Ugo Oluodu Mary', stateCode: 'FC/25A/11684', position: 'General Secretary', phone: '' },
  { name: 'Adebisi Timileyin Sodiq', stateCode: 'FC/25A/11981', position: 'Financial Secretary', phone: '' },
  { name: 'Yakubu Kamaldeen', stateCode: 'FC/25A/12425', position: 'Treasurer', phone: '' },
  { name: 'Nnamani Nwanne Patrice', stateCode: 'FC/25A/7374', position: 'Welfare Secretary', phone: '' },
  { name: 'Yamah David Adiomokhai', stateCode: 'FC/25A/12407', position: 'PRO', phone: '' },
  { name: 'Becky Peter Uba', stateCode: 'FC/25A/8876', position: '-', phone: '' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-4 sm:py-8 px-2 sm:px-4 lg:px-8">
      <div className="max-w-full sm:max-w-3xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <div className="text-base font-semibold text-blue-800 mb-1">Sustainable Development Group (SDG)</div>
          <div className="text-sm text-gray-800">A CDS under the United Nations Charter for 2030</div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Contact & Executive Committee</h1>
        <div className="w-16 h-1 bg-blue-500 mb-6 sm:mb-8 rounded-full"></div>
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">2025 Executive Committee (EXCO)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full bg-white border border-gray-200 rounded-lg text-xs sm:text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 uppercase tracking-wider">Name</th>
                  <th className="px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 uppercase tracking-wider">State Code</th>
                  <th className="px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 uppercase tracking-wider">Position</th>
                  <th className="px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 uppercase tracking-wider">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {exco.map((member, idx) => (
                  <tr key={idx}>
                    <td className="px-2 sm:px-4 py-2 text-gray-400 break-words">{member.name}</td>
                    <td className="px-2 sm:px-4 py-2 text-gray-400 break-words">{member.stateCode}</td>
                    <td className="px-2 sm:px-4 py-2 text-gray-400 break-words">{member.position}</td>
                    <td className="px-2 sm:px-4 py-2 text-gray-400 italic">{member.phone || '(number)'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-gray-500">Phone numbers will be added soon.</div>
        </section>
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Our Mission</h2>
          <p className="text-gray-700 text-base sm:text-lg mb-4">To empower CDS groups with simple, secure, and transparent financial tools, making group management stress-free and trustworthy for everyone.</p>
        </section>
      </div>
    </div>
  );
}
