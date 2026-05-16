import { useSearchParams } from 'react-router-dom';

export default function Error() {
    const [searchParams] = useSearchParams();
    const error = searchParams.get('error') || 'unknown_error';
    const message = searchParams.get('message') || 'Something went wrong';

    return (
        <div className="container">
        <div className="card">
            <h2>❌ Error</h2>
            <p className="subtitle">{message}</p>
            <code>{error}</code>
        </div>
        </div>
    );
}