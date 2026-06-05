import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import BookingSection from './components/BookingSection';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getCurrentMonthKey, getTodayDate, sortBookings } from './helpers';
import {
  ADMIN_PASSWORD,
  bookingStorageKey,
  expenseStorageKey,
  galleryItems,
  incomeStorageKey,
  initialFormState,
  servicePrices,
  services,
  testimonials,
} from './data';

function App() {
  const today = getTodayDate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [bookings, setBookings] = useLocalStorage(bookingStorageKey, []);
  const [incomes, setIncomes] = useLocalStorage(incomeStorageKey, []);
  const [expenses, setExpenses] = useLocalStorage(expenseStorageKey, []);
  const [incomeForm, setIncomeForm] = useState({ source: 'Retail Sales', amount: '', date: today });
  const [expenseForm, setExpenseForm] = useState({ category: 'Supplies', amount: '', date: today });
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [adminPassword, setAdminPassword] = useState('');
  const [route, setRoute] = useState(
    () => (typeof window !== 'undefined' ? window.location.hash.replace('#', '') || 'home' : 'home')
  );

  const minDate = today;

  const bookingRevenue = useMemo(
    () => bookings.reduce((sum, booking) => sum + (servicePrices[booking.service] || 0), 0),
    [bookings]
  );

  const totalOtherIncome = useMemo(
    () => incomes.reduce((sum, income) => sum + Number(income.amount), 0),
    [incomes]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [expenses]
  );

  const totalRevenue = bookingRevenue + totalOtherIncome;
  const netProfit = totalRevenue - totalExpenses;

  const currentMonthKey = useMemo(() => getCurrentMonthKey(), []);

  const bookingsThisMonth = useMemo(
    () => bookings.filter((booking) => booking.date.startsWith(currentMonthKey)),
    [bookings, currentMonthKey]
  );

  const sortedBookings = useMemo(() => sortBookings(bookings), [bookings]);

  const clientCountThisMonth = useMemo(
    () => new Set(bookingsThisMonth.map((booking) => booking.email.toLowerCase())).size,
    [bookingsThisMonth]
  );

  const topServiceThisMonth = useMemo(() => {
    const counts = bookingsThisMonth.reduce((current, booking) => {
      current[booking.service] = (current[booking.service] || 0) + 1;
      return current;
    }, {});

    const sortedServices = Object.entries(counts).sort(([, a], [, b]) => b - a);
    return sortedServices.length ? sortedServices[0][0] : 'N/A';
  }, [bookingsThisMonth]);

  const revenueThisMonth = useMemo(
    () => bookingsThisMonth.reduce((sum, booking) => sum + (servicePrices[booking.service] || 0), 0),
    [bookingsThisMonth]
  );

  const incomesThisMonth = useMemo(
    () => incomes.filter((item) => item.date.startsWith(currentMonthKey)),
    [incomes, currentMonthKey]
  );

  const expensesThisMonth = useMemo(
    () => expenses.filter((item) => item.date.startsWith(currentMonthKey)),
    [expenses, currentMonthKey]
  );

  const incomeThisMonth = useMemo(
    () => incomesThisMonth.reduce((sum, item) => sum + Number(item.amount), 0),
    [incomesThisMonth]
  );

  const expenseThisMonth = useMemo(
    () => expensesThisMonth.reduce((sum, item) => sum + Number(item.amount), 0),
    [expensesThisMonth]
  );

  const totalRevenueThisMonth = revenueThisMonth + incomeThisMonth;
  const netThisMonth = totalRevenueThisMonth - expenseThisMonth;

  const handleFormChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      setFormData((current) => ({
        ...current,
        [name]: files?.[0]?.name || '',
      }));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.service || !formData.date || !formData.time) {
      setFormMessage('Please complete all required fields before submitting.');
      setFormStatus('error');
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    setFormMessage(
      `Thank you, ${formData.fullName}! Your booking request for ${formData.service} on ${formData.date} at ${formData.time} has been saved. An owner can review it from the secure admin page.`
    );
    setFormStatus('success');
    setFormData(initialFormState);
    setMenuOpen(false);
  };

  const handleBookingStatusChange = (bookingId, status) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();

    if (adminPassword === ADMIN_PASSWORD) {
      setAdminAuth(true);
      setAdminTab('bookings');
      setFormMessage('Owner access granted. You can now view bookings.');
      setFormStatus('success');
    } else {
      setFormMessage('Incorrect secret password. Please try again.');
      setFormStatus('error');
    }
  };

  const handleLogout = () => {
    setAdminAuth(false);
    setAdminPassword('');
    setFormMessage('Logged out successfully.');
    setFormStatus('success');
    window.location.hash = '#home';
  };

  const handleAddIncome = (event) => {
    event.preventDefault();

    if (!incomeForm.source || !incomeForm.amount || !incomeForm.date) {
      setFormMessage('Please complete all income fields.');
      setFormStatus('error');
      return;
    }

    const newIncome = {
      id: Date.now(),
      ...incomeForm,
      amount: Number(incomeForm.amount),
      createdAt: new Date().toISOString(),
    };

    const updatedIncomes = [newIncome, ...incomes];
    setIncomes(updatedIncomes);
    setIncomeForm({ source: 'Retail Sales', amount: '', date: today });
    setFormMessage('Income item added successfully.');
    setFormStatus('success');
  };

  const handleAddExpense = (event) => {
    event.preventDefault();

    if (!expenseForm.category || !expenseForm.amount || !expenseForm.date) {
      setFormMessage('Please complete all expense fields.');
      setFormStatus('error');
      return;
    }

    const newExpense = {
      id: Date.now(),
      ...expenseForm,
      amount: Number(expenseForm.amount),
      createdAt: new Date().toISOString(),
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    setExpenseForm({ category: 'Supplies', amount: '', date: today });
    setFormMessage('Expense item added successfully.');
    setFormStatus('success');
  };

  const handleIncomeChange = (field, value) => {
    setIncomeForm((current) => ({ ...current, [field]: value }));
  };

  const handleExpenseChange = (field, value) => {
    setExpenseForm((current) => ({ ...current, [field]: value }));
  };

  const handlePasswordChange = (value) => {
    setAdminPassword(value);
  };

  const updateRoute = () => {
    setRoute(window.location.hash.replace('#', '') || 'home');
  };

  useEffect(() => {
    updateRoute();
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  if (route === 'admin') {
    return (
      <AdminPage
        adminAuth={adminAuth}
        adminTab={adminTab}
        adminPassword={adminPassword}
        formStatus={formStatus}
        formMessage={formMessage}
        bookings={bookings}
        sortedBookings={sortedBookings}
        servicePrices={servicePrices}
        incomes={incomes}
        expenses={expenses}
        incomeForm={incomeForm}
        expenseForm={expenseForm}
        minDate={minDate}
        handleAdminLogin={handleAdminLogin}
        handleLogout={handleLogout}
        handlePasswordChange={handlePasswordChange}
        handleBookingStatusChange={handleBookingStatusChange}
        setAdminTab={setAdminTab}
        handleIncomeChange={handleIncomeChange}
        handleExpenseChange={handleExpenseChange}
        handleAddIncome={handleAddIncome}
        handleAddExpense={handleAddExpense}
        bookingsThisMonth={bookingsThisMonth}
        clientCountThisMonth={clientCountThisMonth}
        revenueThisMonth={revenueThisMonth}
        incomeThisMonth={incomeThisMonth}
        netThisMonth={netThisMonth}
        topServiceThisMonth={topServiceThisMonth}
        totalRevenueThisMonth={totalRevenueThisMonth}
        expenseThisMonth={expenseThisMonth}
      />
    );
  }

  return (
    <div>
      <Header onToggleMenu={() => setMenuOpen((current) => !current)} menuOpen={menuOpen} />
      <main>
        <Hero />
        <Services services={services} />
        <Gallery galleryItems={galleryItems} />
        <BookingSection
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          formStatus={formStatus}
          formMessage={formMessage}
          minDate={minDate}
          serviceOptions={Object.keys(servicePrices)}
        />
        <About />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
