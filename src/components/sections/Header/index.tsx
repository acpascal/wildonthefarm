import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Link, Action } from '../../atoms';
import ImageBlock from '../../blocks/ImageBlock';
import ChevronDownIcon from '../../svgs/chevron-down';
import CloseIcon from '../../svgs/close';
import LocalizationGlobeIcon from '../../svgs/localization-globe';
import MenuIcon from '../../svgs/menu';

export default function Header(props) {
    const { colors = 'bg-light-fg-dark', styles = {}, enableAnnotations } = props;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={classNames(
                'sb-component',
                'sb-component-header',
                isScrolled ? colors : 'bg-transparent text-neutral',
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'p-4'
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <div className="mx-auto max-w-7xl">
                <Link href="#main" className="sr-only">
                    Skip to main content
                </Link>
                <HeaderVariants {...props} />
            </div>
        </header>
    );
}

function HeaderVariants(props) {
    const { variant = 'logo-left-primary-nav-left', ...rest } = props;
    switch (variant) {
        case 'logo-left-primary-nav-centered':
            return <HeaderLogoLeftPrimaryCentered {...rest} />;
        case 'logo-left-primary-nav-right':
            return <HeaderLogoLeftPrimaryRight {...rest} />;
        case 'logo-centered-primary-nav-left':
            return <HeaderLogoCenteredPrimaryLeft {...rest} />;
        case 'logo-centered-primary-nav-centered':
            return <HeaderLogoCenteredPrimaryCentered {...rest} />;
        default:
            return <HeaderLogoLeftPrimaryLeft {...rest} />;
    }
}

function HeaderLogoLeftPrimaryLeft(props) {
    const { title, subtitle, logo, primaryLinks = [], secondaryLinks = [], locales = [], colors = 'bg-light-fg-dark', enableAnnotations, locale } = props;
    return (
        <div className="relative flex items-center">
            {(title || logo?.url) && (
                <div className="mr-10">
                    <SiteLogoLink title={title} subtitle={subtitle} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden mr-10 gap-x-10 lg:flex lg:items-center" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto gap-x-2.5 lg:flex lg:items-center" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                    <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            <div className="hidden lg:flex lg:items-center ml-auto">
                {secondaryLinks.length > 0 && (
                    <ul className="flex items-center" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                        <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                    </ul>
                )}
            </div>
            {locales.length > 0 && (
                <ul className="hidden lg:flex lg:items-center ml-auto gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'locales' })}>
                    <LocaleSwitcher locales={locales} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderLogoLeftPrimaryCentered(props) {
    const { title, subtitle, logo, primaryLinks = [], secondaryLinks = [], locales = [], colors = 'bg-light-fg-dark', enableAnnotations, locale } = props;
    return (
        <div className="relative flex items-center">
            {(title || logo?.url) && (
                <div className="mr-10">
                    <SiteLogoLink title={title} subtitle={subtitle} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul
                    className="absolute hidden w-auto -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center gap-x-10 left-1/2 top-1/2"
                    {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}
                >
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden lg:flex lg:items-center ml-auto gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                    <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {locales.length > 0 && (
                <ul className="hidden lg:flex lg:items-center ml-auto gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'locales' })}>
                    <LocaleSwitcher locales={locales} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderLogoLeftPrimaryRight(props) {
    const { title, subtitle, logo, primaryLinks = [], secondaryLinks = [], locales = [], colors = 'bg-light-fg-dark', enableAnnotations, locale } = props;
    return (
        <div className="relative flex items-center">
            {(title || logo?.url) && (
                <div className="mr-10">
                    <SiteLogoLink title={title} subtitle={subtitle} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden ml-auto lg:flex lg:items-center gap-x-10" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul
                    className={classNames('hidden', 'lg:flex', 'lg:items-center', 'gap-x-2.5', primaryLinks.length > 0 ? 'ml-10' : 'ml-auto')}
                    {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}
                >
                    <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {locales.length > 0 && (
                <ul className="hidden lg:flex lg:items-center ml-auto gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'locales' })}>
                    <LocaleSwitcher locales={locales} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0 || locales.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderLogoCenteredPrimaryLeft(props) {
    const { title, subtitle, logo, primaryLinks = [], secondaryLinks = [], locales = [], colors = 'bg-light-fg-dark', enableAnnotations, locale } = props;
    return (
        <div className="relative flex items-center">
            {(title || logo?.url) && (
                <div className="mr-10 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2">
                    <SiteLogoLink title={title} subtitle={subtitle} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden lg:flex lg:items-center gap-x-10" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden lg:flex lg:items-center ml-auto gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                    <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {locales.length > 0 && (
                <ul className="hidden lg:flex lg:items-center ml-auto gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'locales' })}>
                    <LocaleSwitcher locales={locales} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
}

function HeaderLogoCenteredPrimaryCentered(props) {
    const { title, subtitle, logo, primaryLinks = [], secondaryLinks = [], locales = [], colors = 'bg-light-fg-dark', enableAnnotations, locale } = props;
    return (
        <>
            <div className="relative flex items-center">
                {(title || logo?.url) && (
                    <div className="mr-10 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2">
                        <SiteLogoLink title={title} subtitle={subtitle} logo={logo} enableAnnotations={enableAnnotations} />
                    </div>
                )}
                {secondaryLinks.length > 0 && (
                    <ul className="hidden lg:flex lg:items-center gap-x-2.5 ml-auto" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                        <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                    </ul>
                )}
                {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
            </div>
            {locales.length > 0 && (
                <ul className="hidden lg:flex lg:items-center ml-auto gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'locales' })}>
                    <LocaleSwitcher locales={locales} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {primaryLinks.length > 0 && (
                <ul
                    className="hidden mt-4 lg:flex lg:items-center lg:justify-center gap-x-10"
                    {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}
                >
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
        </>
    );
}

function MobileMenu(props) {
    const { title, subtitle, logo, primaryLinks = [], secondaryLinks = [], locales = [], colors = 'bg-light-fg-dark', styles = {}, enableAnnotations, locale } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const openMobileMenu = () => {
        setIsMenuOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <div className="ml-auto lg:hidden">
            <button aria-label="Open Menu" title="Open Menu" className="p-2 -mr-1 focus:outline-none" onClick={openMobileMenu}>
                <span className="sr-only">Open Menu</span>
                <MenuIcon className="w-6 h-6 fill-current" />
            </button>
            <div className={classNames(colors, 'fixed', 'inset-0', styles?.self?.padding ?? 'p-4', 'overflow-y-auto', 'z-10', isMenuOpen ? 'block' : 'hidden')}>
                <div className="flex flex-col min-h-full">
                    <div className="flex items-center justify-between mb-10">
                        {(title || logo?.url) && <SiteLogoLink title={title} subtitle={subtitle} logo={logo} enableAnnotations={enableAnnotations} />}
                        <button aria-label="Close Menu" title="Close Menu" className="p-2 -mr-1 focus:outline-none" onClick={closeMobileMenu}>
                            <CloseIcon className="w-6 h-6 fill-current" />
                        </button>
                    </div>
                    {primaryLinks.length > 0 && (
                        <ul {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                            <ListOfLinks links={primaryLinks} enableAnnotations={enableAnnotations} inMobileMenu />
                        </ul>
                    )}
                    {secondaryLinks.length > 0 && (
                        <ul {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                            <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} inMobileMenu />
                        </ul>
                    )}
                    {locales.length > 0 && (
                        <ul {...(enableAnnotations && { 'data-sb-field-path': 'locales' })}>
                            <LocaleSwitcher locales={locales} enableAnnotations={enableAnnotations} />
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

function SiteLogoLink({ title, subtitle, logo, enableAnnotations }) {
    return (
        <Link href="/" className="flex items-center">
            {logo && (
                <ImageBlock
                    {...logo}
                    {...(enableAnnotations && { 'data-sb-field-path': 'logo' })}
                />
            )}
            {title && subtitle ? (
                <div className="flex flex-col">
                    <span className="h4" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                        {title}
                    </span>
                    <span className="h6" {...(enableAnnotations && { 'data-sb-field-path': 'subtitle' })}>
                        {subtitle}
                    </span>
                </div>
            ) : (
                <>
                    {title && (
                        <span className="h4" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                            {title}
                        </span>
                    )}
                    {subtitle && (
                        <span className="h6" {...(enableAnnotations && { 'data-sb-field-path': 'subtitle' })}>
                            {subtitle}
                        </span>
                    )}
                </>
            )}
        </Link>
    );
}

function ListOfLinks(props) {
    const { links = [], colors, enableAnnotations, inMobileMenu = false } = props;

    return (
        <>
            {links.map((link, index) => {
                if (link.__metadata.modelName === 'SubNav') {
                    return (
                        <LinkWithSubnav
                            key={index}
                            link={link}
                            inMobileMenu={inMobileMenu}
                            colors={colors}
                            {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                        />
                    );
                } else {
                    return (
                        <li
                            key={index}
                            className={classNames(inMobileMenu ? 'border-t' : 'py-2', {
                                'py-4': inMobileMenu && link.__metadata.modelName === 'Button'
                            })}
                        >
                            <Action
                                {...link}
                                className={classNames('whitespace-nowrap', inMobileMenu ? 'w-full' : 'text-sm', {
                                    'justify-start py-3': inMobileMenu && link.__metadata.modelName === 'Link'
                                })}
                                {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                            />
                        </li>
                    );
                }
            })}
        </>
    );
}

function LinkWithSubnav(props) {
    const { link, colors, inMobileMenu = false } = props;
    const [isSubNavOpen, setIsSubNavOpen] = useState(false);
    const router = useRouter();
    const fieldPath = props['data-sb-field-path'];

    useEffect(() => {
        const handleRouteChange = () => {
            setIsSubNavOpen(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <li
            className={classNames('relative', inMobileMenu ? 'border-t py-3' : 'py-2 group')}
            onMouseLeave={
                !process.env.stackbitPreview && !inMobileMenu
                    ? () => {
                          setIsSubNavOpen(false);
                      }
                    : undefined
            }
            data-sb-field-path={fieldPath}
        >
            <button
                onMouseOver={
                    !process.env.stackbitPreview && !inMobileMenu
                        ? () => {
                              setIsSubNavOpen(true);
                          }
                        : undefined
                }
                onClick={() => setIsSubNavOpen((prev) => !prev)}
                className={classNames(
                    'sb-component',
                    'sb-component-block',
                    'sb-component-link',
                    link.labelStyle === 'secondary' ? 'sb-component-link-secondary' : 'sb-component-link-primary',
                    'inline-flex',
                    'items-center',
                    inMobileMenu ? 'w-full' : 'text-sm',
                    {
                        'group-hover:no-underline hover:no-underline': !inMobileMenu && (link.labelStyle ?? 'primary') === 'primary',
                        'group-hover:text-primary': !inMobileMenu && link.labelStyle === 'secondary'
                    }
                )}
            >
                <span {...(fieldPath && { 'data-sb-field-path': '.label' })}>{link.label}</span>
                <ChevronDownIcon
                    className={classNames('fill-current', 'shrink-0', 'h-4', 'w-4', isSubNavOpen && 'rotate-180', inMobileMenu ? 'ml-auto' : 'ml-1')}
                />
            </button>
            {(link.links ?? []).length > 0 && (
                <ul
                    className={classNames(
                        colors,
                        inMobileMenu ? 'p-4 space-y-3' : 'absolute top-full left-0 w-44 border-t border-primary shadow-header z-10 px-6 pt-5 pb-6 space-y-4',
                        isSubNavOpen ? 'block' : 'hidden'
                    )}
                    {...(fieldPath && { 'data-sb-field-path': '.links' })}
                >
                    <ListOfSubNavLinks links={link.links} hasAnnotations={!!fieldPath} inMobileMenu={inMobileMenu} />
                </ul>
            )}
        </li>
    );
}

function ListOfSubNavLinks({ links = [], hasAnnotations, inMobileMenu = false }) {
    return (
        <>
            {links.map((link, index) => (
                <li key={index}>
                    <Action
                        {...link}
                        className={classNames(inMobileMenu ? 'w-full justify-start' : 'text-sm')}
                        {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })}
                    />
                </li>
            ))}
        </>
    );
}

function LocaleSwitcher(props) {
    const { locales, inMobileMenu = false } = props;
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const selfTriggeredSwitch = useRef(false);

    useEffect(() => {
        const handler = (event) => {
            if (selfTriggeredSwitch.current) {
                selfTriggeredSwitch.current = false;
                return;
            }
            const locale = event?.detail?.locale;
            if (!locale) return;
            const asPath = router.asPath;
            router.push(asPath, asPath, { locale });
        };
        window.addEventListener('stackbitLocaleChanged', handler);
        return () => window.removeEventListener('stackbitLocaleChanged', handler);
    }, [router]);

    useEffect(() => {
        // close menu on route change
        const handleRouteChange = () => setIsOpen(false);
        router.events.on('routeChangeStart', handleRouteChange);
        return () => router.events.off('routeChangeStart', handleRouteChange);
    }, [router.events]);

    const navigateLocale = (locale) => {
        const asPath = router.asPath;
        router.push(asPath, asPath, { locale });
        selfTriggeredSwitch.current = true;
        try {
            (window as any).stackbit?.setLocale(locale);
        } catch (err) {
            // ignore
        }
        setIsOpen(false);
    };

    return (
        <li
            className={classNames('relative', inMobileMenu ? 'border-t py-3' : 'py-2 group')}
            onMouseLeave={!process.env.stackbitPreview && !inMobileMenu ? () => setIsOpen(false) : undefined}
        >
            <button
                onMouseOver={!process.env.stackbitPreview && !inMobileMenu ? () => setIsOpen(true) : undefined}
                onClick={() => setIsOpen((p) => !p)}
                className={classNames(
                    'sb-component',
                    'sb-component-block',
                    'sb-component-link',
                    'inline-flex',
                    'items-center',
                    inMobileMenu ? 'w-full' : 'text-sm'
                )}
            >
                <LocalizationGlobeIcon className={classNames('shrink-0', 'h-4', 'w-4', inMobileMenu ? 'mr-2' : 'mr-1')} />
                <ChevronDownIcon className={classNames('fill-current', 'shrink-0', 'h-4', 'w-4', isOpen && 'rotate-180', inMobileMenu ? 'ml-auto' : 'ml-1')} />
            </button>
            <ul
                className={classNames(
                    inMobileMenu ? 'p-4 space-y-3' : 'absolute top-full left-0 w-32 border-t border-primary shadow-header z-10 px-6 pt-5 pb-6 space-y-4',
                    isOpen ? 'block' : 'hidden'
                )}
            >
                {locales.map((l) => (
                    <li key={l.value}>
                        <button
                            onClick={() => navigateLocale(l.value)}
                            className={classNames(inMobileMenu ? 'w-full justify-start' : 'text-sm')}
                        >
                            {l.label}
                        </button>
                    </li>
                ))}
            </ul>
        </li>
    );
}