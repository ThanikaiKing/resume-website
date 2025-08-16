import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getResumeSection } from '@/lib/content';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Get resume data
    const name = getResumeSection('name');
    const title = getResumeSection('title');
    
    // Get optional parameters from URL
    const { searchParams } = new URL(request.url);
    const customTitle = searchParams.get('title');
    const customDescription = searchParams.get('description');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #e5e5e5 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e5e5e5 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            position: 'relative',
          }}
        >
          {/* Background Gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
              opacity: 0.1,
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 60px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '900px',
              margin: '0 40px',
            }}
          >
            {/* Name with Gradient */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                marginBottom: '20px',
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              {name}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '36px',
                fontWeight: '600',
                color: '#404040',
                marginBottom: '30px',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {customTitle || title}
            </div>

            {/* Description */}
            {customDescription && (
              <div
                style={{
                  fontSize: '24px',
                  color: '#737373',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  maxWidth: '700px',
                }}
              >
                {customDescription}
              </div>
            )}

            {/* Accent Line */}
            <div
              style={{
                width: '120px',
                height: '4px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                borderRadius: '2px',
                marginTop: '40px',
              }}
            />
          </div>

          {/* Bottom Branding */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '18px',
              color: '#737373',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                borderRadius: '50%',
              }}
            />
            Resume Portfolio
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    console.log(`Failed to generate OG image: ${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
