function AdminTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'bookings', label: 'Bookings' },
    { key: 'budget', label: 'Budget' },
  ];

  return (
    <div className="admin-tab-menu">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default AdminTabs;
