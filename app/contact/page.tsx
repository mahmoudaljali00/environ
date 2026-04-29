'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import Navbar from '@/components/navbar'
import SectionReveal from '@/components/section-reveal'
import { useLang } from '@/components/lang-provider'
import { useSettings } from '@/components/settings-provider'
import { submitContactForm } from './actions'

export default function ContactPage() {
  const { t, isRTL } = useLang()
  const settings = useSettings()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  // Use database settings with i18n fallbacks
  const address = isRTL 
    ? (settings?.address_ar || t.contact.address)
    : (settings?.address || t.contact.address)
  const phone = settings?.phone || t.contact.phone
  const email = settings?.email || t.contact.email

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await submitContactForm({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      company: undefined,
      service: form.service || undefined,
      message: form.message
    })
    
    setLoading(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      alert('Failed to submit form. Please try again.')
    }
  }

  const contactInfo = [
    { icon: MapPin, label: t.contact.address_label, value: address, href: undefined },
    { icon: Phone, label: t.contact.phone_label, value: phone, href: `tel:${phone}` },
    { icon: Mail, label: t.contact.email_label, value: email, href: `mailto:${email}` },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-[0.05]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/8 blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
              {t.nav.contact}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              {t.contact.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t.contact.subtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-10 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            {/* Contact info */}
            <SectionReveal className="lg:col-span-2 flex flex-col gap-5">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className={`glass-card rounded-2xl p-5 flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-foreground hover:text-primary transition-colors" dir="ltr">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map embed */}
              <div className="glass-card rounded-2xl overflow-hidden h-64 relative">
                <iframe
                  title="ENVIRON Office Location"
                  src="https://maps.google.com/maps?q=15.5007,32.5599&z=13&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 pointer-events-none border border-primary/20 rounded-2xl" />
              </div>
            </SectionReveal>

            {/* Form */}
            <SectionReveal delay={0.15} className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-6 sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{t.contact.form.success}</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">{t.contact.reply_time}</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', service:'', message:'' }) }}
                      className="mt-2 text-sm text-primary hover:underline"
                    >
                      {t.contact.another}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
                    <h2 className={`text-xl font-bold mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.contact.send_message}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground">{t.contact.form.name} *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground">{t.contact.form.email} *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          dir="ltr"
                          className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground">{t.contact.form.phone}</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          dir="ltr"
                          className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground">{t.contact.form.service}</label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                        >
                          <option value="">{t.contact.form.select_service}</option>
                          {t.services.items.map((s) => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-muted-foreground">{t.contact.form.message} *</label>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder={t.contact.form.message_placeholder}
                        className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          {t.contact.form.sending}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.contact.form.submit}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
