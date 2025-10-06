import React from 'react';
import Head from 'next/head';
import { allContent } from '../utils/local-content';
import { getComponent } from '../components/components-registry';
import { resolveStaticProps } from '../utils/static-props-resolvers';
import { resolveStaticPaths } from '../utils/static-paths-resolvers';
import { seoGenerateTitle, seoGenerateMetaTags, seoGenerateMetaDescription } from '../utils/seo-utils';

function Page(props) {
    const { page, site } = props;
    const { modelName } = page.__metadata;
    if (!modelName) {
        throw new Error(`page has no type, page '${props.path}'`);
    }
    const PageLayout = getComponent(modelName);
    if (!PageLayout) {
        throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    const title = seoGenerateTitle(page, site);
    const metaTags = seoGenerateMetaTags(page, site);
    const metaDescription = seoGenerateMetaDescription(page, site);
    return (
        <>
            <Head>
                <title>{title}</title>
                {metaDescription && <meta name="description" content={metaDescription} />}
                {metaTags.map((metaTag) => {
                    if (metaTag.format === 'property') {
                        // OpenGraph meta tags (og:*) should be have the format <meta property="og:…" content="…">
                        return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
                    }
                    return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            <PageLayout page={page} site={site} />
        </>
    );
}

export function getStaticPaths({ locales = ['en'] }) {
    const paths = [];

    // build paths for every locale
    for (const locale of locales) {
        const data = allContent(locale);
        const rawPaths = resolveStaticPaths(data);
        const localePaths = rawPaths.map((p) => {
            // normalize string paths into Next-compatible { params: { slug: [...] } }
            if (typeof p === 'string') {
                const url = p;
                const slugArray = url === '/' ? [] : url.replace(/^\//, '').split('/');
                return { params: { slug: slugArray }, locale };
            }
            // if already an object (likely with params), just attach locale
            return { ...p, locale };
        });
        paths.push(...localePaths);
    }
    return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
    const data = allContent(locale || 'en');
    const urlPath = '/' + (params.slug || []).join('/');
    const props = await resolveStaticProps(urlPath, data);
    // include locale so components can render locale-specific UI
    props.locale = locale || 'en';
    return { props };
}

export default Page;
