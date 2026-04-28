/**
 * Analytics utility for tracking user interactions.
 * Uses Google Analytics (gtag) if initialized.
 */

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
    console.log(`[Analytics] Tracked event: ${eventName}`, eventParams);
  }
};

export const trackLead = (method: string, industry?: string) => {
  trackEvent('generate_lead', {
    method,
    industry,
  });
};

export const trackInteraction = (type: 'chat' | 'voice' | 'roi' | 'live_lab', action: string) => {
  trackEvent('interaction', {
    interaction_type: type,
    interaction_action: action,
  });
};
