import HeaderSection from '../components/ui/HeaderSection'
import TabComponent from '../components/ui/TabComponent'
import ToolDescription from '../components/ui/ToolDescription'
import { MultiSelectBadgeGroup } from '../components/ui/badges'
import { PlaceholdersAndVanishInput } from '../components/ui/Placeholders'
import { StatefulButton } from '../components/ui/stateful-button'
import { useState } from 'react'
import { 
  FaGlobe, 
  FaBolt, 
  FaHandshake, 
  FaChartBar, 
  FaCog, 
  FaSearch 
} from 'react-icons/fa'

function ToolsPage() {
  // State for selected analysis options
  const [selectedAnalysis, setSelectedAnalysis] = useState(['region', 'ping'])
  // State for bulk import checkbox
  const [isBulkImport, setIsBulkImport] = useState(false)

  // Analysis options for badges
  const analysisOptions = [
    { value: 'region', label: 'Region', icon: FaGlobe },
    { value: 'ping', label: 'Ping', icon: FaBolt },
    { value: 'handshake', label: 'Handshake', icon: FaHandshake },
    { value: 'quality', label: 'Quality', icon: FaChartBar },
    { value: 'protocol', label: 'Protocol', icon: FaCog },
    { value: 'full', label: 'Full', icon: FaSearch }
  ]

  // Analysis tool data
  const analysisData = {
    title: "Analysis Tools",
    icon: "🔍",
    description: "Comprehensive analysis tools for proxy servers and IP addresses. Analyze geographical location, connection quality, protocol support, and performance metrics.",
    features: [
      { icon: "🌍", name: "Region Detection", description: "Find server geographical location" },
      { icon: "⚡", name: "Ping Test", description: "Measure network latency and response time" },
      { icon: "🤝", name: "Handshake Analysis", description: "SSL/TLS connection establishment" },
      { icon: "📊", name: "Quality Assessment", description: "Overall connection stability" },
      { icon: "🔧", name: "Protocol Check", description: "Supported protocols detection" },
      { icon: "🔍", name: "Full Analysis", description: "Complete comprehensive scan" }
    ],
    tips: [
      "Enter one IP per line for bulk analysis",
      "Select multiple analysis types for comprehensive results",
      "Use Full Analysis for complete server evaluation"
    ]
  }

  const tabsData = [
    {
      label: "Analysis ",
      content: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Left Side - Tool Description */}
          <ToolDescription 
            title={analysisData.title}
            icon={analysisData.icon}
            description={analysisData.description}
            features={analysisData.features}
            tips={analysisData.tips}
          />

          {/* Right Side - Tool Interface */}
          <div style={{
            backgroundColor: 'var(--card)',
            borderRadius: 'var(--radius)',
            padding: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--foreground)',
              marginBottom: '1rem'
            }}>
              🎯 IP Analysis Tool
            </h3>
            
            {/* IP Input Area */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--foreground)'
                }}>
                  IP Address(es)
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    id="bulkImport"
                    checked={isBulkImport}
                    onChange={(e) => setIsBulkImport(e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer'
                    }}
                  />
                  <label
                    htmlFor="bulkImport"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: 'var(--foreground)',
                      cursor: 'pointer'
                    }}
                  >
                    Bulk Import
                  </label>
                </div>
              </div>
              
              {isBulkImport ? (
                <textarea
                  placeholder="Enter IP addresses (one per line for bulk)&#10;Example:&#10;192.168.1.1&#10;8.8.8.8&#10;1.1.1.1"
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                    fontFamily: 'monospace'
                  }}
                />
              ) : (
                <div style={{ width: '100%' }}>
                  <PlaceholdersAndVanishInput
                    placeholders={[
                      "Enter a single IP address...",
                      "8.8.8.8",
                      "192.168.1.1",
                      "1.1.1.1",
                      "Enter IP to analyze..."
                    ]}
                    onChange={(e) => {
                      // Handle single IP input change
                    }}
                    onSubmit={(e) => {
                      // Handle single IP submit
                    }}
                    showIcon={false}
                  />
                </div>
              )}
            </div>

            {/* Analysis Options */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--foreground)',
                marginBottom: '0.5rem'
              }}>
                Analysis Options
              </label>
              <MultiSelectBadgeGroup
                options={analysisOptions}
                selectedValues={selectedAnalysis}
                onSelectionChange={setSelectedAnalysis}
                variant="outline"
                selectedVariant="success"
                size="default"
                allowEmpty={true}
                spacing="normal"
              />
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <StatefulButton
                onClick={async () => {
                  // Simulate API call for analysis
                  await new Promise(resolve => setTimeout(resolve, 3000));
                  console.log('Analysis completed!');
                }}
                loadingText="Analyzing..."
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  flex: 1
                }}
              >
                Start Analysis
              </StatefulButton>
              <button style={{
                backgroundColor: 'transparent',
                color: 'var(--muted-foreground)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                Clear
              </button>
            </div>

            {/* Results Section */}
            <div style={{
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius)',
              padding: '2rem',
              border: '1px dashed var(--border)',
              textAlign: 'center'
            }}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--foreground)',
                marginBottom: '0.5rem'
              }}>
                📊 Analysis Results
              </h4>
              <p style={{
                color: 'var(--muted-foreground)',
                fontSize: '0.875rem',
                margin: '0'
              }}>
                Enter IP addresses and start analysis to view results here
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      label: "Conversion ",
      content: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Conversion tools content will go here */}
        </div>
      )
    },
    {
      label: "Management",
      content: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Network tools content will go here */}
        </div>
      )
    }
  ]

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <HeaderSection 
        title="Tools" 
        description="Explore our collection of useful tools for proxy testing, IP location lookup, and connection speed testing."
      />
      
      <TabComponent tabs={tabsData} defaultTab={0} />
    </div>
  )
}

export default ToolsPage