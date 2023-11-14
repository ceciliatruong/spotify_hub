export default function SpotifyEmbed({ type, id, size }) {
    return(
        <>
            <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}
                width="100%"
                height={`${size}px`}
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                
                loading="lazy">
            </iframe>
        </>
    );
}
