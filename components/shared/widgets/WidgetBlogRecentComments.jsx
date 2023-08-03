import React from 'react';
import Link from 'next/link';

const WidgetBlogRecentComments = () => {
    return (
        <aside className="widget widget--blog widget--recent-comments">
            <h3 className="widget__title">Recent Comments</h3>
            <div className="widget__content">
                <p>
                    <Link href="/blog">
                        <p className="author">drfurion </p>
                    </Link>
                    on{' '}
                    <Link href="/blog">
                        <p> Dashboard</p>
                    </Link>
                </p>
                <p>
                    <Link href="/blog">
                        <p className="author">logan </p>
                    </Link>
                    on{' '}
                    <Link href="/blog">
                        <p> Rayban Rounded Sunglass Brown Color</p>
                    </Link>
                </p>
                <p>
                    <Link href="/blog">
                        <p className="author">logan </p>
                    </Link>
                    on{' '}
                    <Link href="/blog">
                        <p> Sound Intone I65 Earphone White Version</p>
                    </Link>
                </p>
                <p>
                    <Link href="/blog">
                        <p className="author">logan</p>
                    </Link>
                    on
                    <Link href="/blog">
                        <p> Sleeve Linen Blend Caro Pane Shirt</p>
                    </Link>
                </p>
            </div>
        </aside>
    );
};

export default WidgetBlogRecentComments;
