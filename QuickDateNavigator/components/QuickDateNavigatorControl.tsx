import * as React from 'react';
import { Calendar, ICalendarProps } from '@fluentui/react/lib/Calendar';
import { DayOfWeek } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { addDays, addMonths, addYears, getEndOfMonth, getNextFriday, ensureDate } from './DateHelpers';

export interface IQuickDateNavigatorProps {
    value?: Date;
    onChange: (date: Date | null) => void;
    disabled?: boolean;
    timelineRange: number;
}

const calendarIcon: IIconProps = { iconName: 'Calendar', style: { cursor: 'pointer' } };

interface PresetOption {
    key: string;
    text: string;
    action: (baseDate: Date) => Date;
}

export const QuickDateNavigatorControl: React.FC<IQuickDateNavigatorProps> = (props) => {
    const { value, onChange, disabled } = props;
    const [isCalloutVisible, setIsCalloutVisible] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const baseDate = ensureDate(value);


    const presets: PresetOption[] = [
        { key: 'today', text: 'Today', action: () => new Date() },
        { key: 'yesterday', text: 'Yesterday', action: () => addDays(new Date(), -1) },
        { key: 'tomorrow', text: 'Tomorrow', action: () => addDays(new Date(), 1) },

        { key: 'nextFriday', text: 'Next Friday', action: () => getNextFriday(new Date()) },
        { key: 'endOfMonth', text: 'End of Month', action: (d) => getEndOfMonth(d) },

        // Relative Navigation
        { key: 'minus7', text: 'Previous 7 Days', action: (d) => addDays(d, -7) },
        { key: 'plus7', text: 'Next 7 Days', action: (d) => addDays(d, 7) },

        { key: 'minus30', text: 'Previous 30 Days', action: (d) => addDays(d, -30) },
        { key: 'plus30', text: 'Next 30 Days', action: (d) => addDays(d, 30) },

        { key: 'minus2Months', text: 'Previous 2 Months', action: (d) => addMonths(d, -2) },
        { key: 'plus2Months', text: 'Next 2 Months', action: (d) => addMonths(d, 2) },

        { key: 'minus1Year', text: 'Previous 1 Year', action: (d) => addYears(d, -1) },
        { key: 'plus1Year', text: 'Next 1 Year', action: (d) => addYears(d, 1) },
    ];

    const onSelectDay = (date: Date, dateRangeArray?: Date[]) => {
        onChange(date);
        setIsCalloutVisible(false);
    };

    const handlePresetClick = (preset: PresetOption) => {
        const startPoint = value || new Date();
        const newDate = preset.action(startPoint);
        onChange(newDate);
        setIsCalloutVisible(false);
    };

    const toggleCallout = () => {
        if (!disabled) {
            setIsCalloutVisible(!isCalloutVisible);
        }
    };

    const dismissCallout = () => {
        setIsCalloutVisible(false);
    };


    const formattedDate = value ? value.toLocaleDateString() : '';

    const [customDays, setCustomDays] = React.useState<string>('5');

    const handleCustomJump = (direction: 'prev' | 'next') => {
        const days = parseInt(customDays, 10);
        if (!isNaN(days) && days > 0) {
            const multiplier = direction === 'prev' ? -1 : 1;
            const startPoint = value || new Date();
            onChange(addDays(startPoint, days * multiplier));
            setIsCalloutVisible(false);
        }
    };

    return (
        <div className="qdn-container" ref={containerRef}>
            <TextField
                value={formattedDate}
                onClick={toggleCallout}
                readOnly={true}
                disabled={disabled}
                placeholder="Select a date..."
                iconProps={calendarIcon}
                onRenderLabel={() => null}
                className="qdn-input"
                style={{ cursor: 'pointer' }}
            />

            {isCalloutVisible && (
                <Callout
                    target={containerRef.current}
                    onDismiss={dismissCallout}
                    directionalHint={DirectionalHint.bottomLeftEdge}
                    directionalHintFixed={true}
                    gapSpace={0}
                    setInitialFocus
                    className="qdn-callout"
                    isBeakVisible={false}
                >
                    <div className="qdn-popup-container">
                        <div className="qdn-sidebar">

                            {/* Custom Jump Section */}
                            <div className="qdn-custom-jump-section">
                                <div className="qdn-sidebar-header">Jump by Days</div>
                                <div style={{ padding: '0 16px 8px 16px', display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid #edebe9', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '12px' }}>Days:</span>
                                        <input
                                            type="number"
                                            value={customDays}
                                            onChange={(e) => setCustomDays(e.target.value)}
                                            style={{ width: '50px', padding: '4px', border: '1px solid #edebe9', borderRadius: '2px' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button
                                            className="qdn-sidebar-action-btn"
                                            onClick={() => handleCustomJump('prev')}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            className="qdn-sidebar-action-btn"
                                            onClick={() => handleCustomJump('next')}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="qdn-sidebar-header">Presets</div>

                            <div className="qdn-sidebar-scroll-area">
                                {presets.map((preset) => (
                                    <button
                                        key={preset.key}
                                        className="qdn-sidebar-item"
                                        onClick={() => handlePresetClick(preset)}
                                    >
                                        {preset.text}
                                    </button>
                                ))}
                            </div>

                        </div>

                        {/* Right Calendar */}
                        <div className="qdn-calendar-area">
                            <Calendar
                                onSelectDate={onSelectDay}
                                value={value || undefined}
                                firstDayOfWeek={DayOfWeek.Sunday}
                                isMonthPickerVisible={true}
                                showGoToToday={false} // "Today" is in the sidebar
                                highlightSelectedMonth={true}
                                showSixWeeksByDefault={true}
                            />
                        </div>
                    </div>
                </Callout>
            )}
        </div>
    );
};
