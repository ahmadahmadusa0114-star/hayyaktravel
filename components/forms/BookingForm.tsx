'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Locale, getTranslation } from '@/lib/i18n';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface BookingFormProps {
    tripTitle: string;
    tripId: string;
}

export function BookingForm({ tripTitle, tripId }: BookingFormProps) {
    const params = useParams();
    const locale = params.locale as Locale;
    const t = getTranslation(locale);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        nationality: '',
        travelersCount: '1',
        dateFrom: '',
        dateTo: '',
        roomType: 'double',
        budget: '',
        notes: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, tripId }),
            });

            if (response.ok) {
                setMessage(t.booking.successMessage);
                setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    nationality: '',
                    travelersCount: '1',
                    dateFrom: '',
                    dateTo: '',
                    roomType: 'double',
                    budget: '',
                    notes: '',
                });
            } else {
                setMessage(t.common.error);
            }
        } catch (error) {
            setMessage(t.common.error);
        } finally {
            setIsLoading(false);
        }
    };

    const roomTypeOptions = [
        { value: 'single', label: t.trips.details.single },
        { value: 'double', label: t.trips.details.double },
        { value: 'triple', label: t.trips.details.triple },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.booking.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label={t.booking.fullName}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        label={t.booking.phone}
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label={t.booking.email}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        label={t.booking.nationality}
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label={t.booking.travelersCount}
                        name="travelersCount"
                        type="number"
                        min="1"
                        value={formData.travelersCount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        label={t.booking.dateFrom}
                        name="dateFrom"
                        type="date"
                        value={formData.dateFrom}
                        onChange={handleChange}
                    />
                    <Input
                        label={t.booking.dateTo}
                        name="dateTo"
                        type="date"
                        value={formData.dateTo}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Select
                        label={t.booking.roomType}
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        options={roomTypeOptions}
                    />
                    <Input
                        label={t.booking.budget}
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder={locale === 'ar' ? 'مثال: 1000 دينار' : 'e.g., 1000 JOD'}
                    />
                </div>

                <Textarea
                    label={t.booking.notes}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                />

                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                    {t.booking.submit}
                </Button>

                {message && (
                    <p className={`text-center ${message === t.booking.successMessage ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
